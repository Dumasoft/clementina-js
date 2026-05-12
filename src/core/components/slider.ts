import {ItemSlider} from '../interfaces/item.slider'
import {get_template, hispt_style, normal_style} from '../templates/slider.template'


export class Slider extends HTMLElement {
    private content?: Node
    private template: HTMLTemplateElement
    private root: ShadowRoot
    private listItems: Array<ItemSlider>
    private interval?: any
    private timer: number = 1000
    private loading = false
    private type = 'normal'

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'closed'})
        this.template = document.createElement('template')
        this.listItems = []
    }

    static get observedAttributes() {
        return ['content', 'timer', 'loading', 'type']
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.resetRoot()
        let content_template = this.getTemplate()

        for (const item of this.listItems) {
            content_template += get_template(item, this.type)
        }

        if (this.type === 'hispt') {
            content_template += '<div class="loader"></div>'
        }

        this.template.innerHTML = content_template
        // @ts-ignore
        this.content = document.importNode(this.template.content, true)
        this.root.innerHTML = ''
        this.root.appendChild(this.content)

        this.prepareSlides();
    }

    getTemplate(): string {
        switch (this.type) {
            case 'normal':
                return normal_style
            case 'hispt':
                return hispt_style
            default:
                return ''
        }
    }

    prepareSlides() {
        const items: NodeListOf<HTMLDivElement> = this.root.querySelectorAll('.item')
        const loader = this.root.querySelector('.loader')


        if (this.loading) {
            setTimeout(() => {
                this.activeSlide(items, 0)

                if (loader) {
                    const parent = loader.parentNode
                    if (parent) {
                        parent.removeChild(loader)
                    }
                }

                this.startInterval(items)
            }, 3000)
        } else {
            this.activeSlide(items, 0)
            this.startInterval(items)
        }
    }

    startInterval(items: NodeListOf<HTMLDivElement>) {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = undefined
        }

        let position = 0;

        this.interval = setInterval(() => {
            position = (position < items.length - 1) ? position + 1 : 0
            this.activeSlide(items, position)
        }, this.timer);
    }

    activeSlide(items: NodeListOf<HTMLDivElement>, itemShow: number) {
        for (let position = 0; position < items.length; position++) {
            if (position === itemShow) {
                items[position].classList.add('active')
                items[position].hidden = false
            } else {
                if (items[position].classList.contains('active')) {
                    items[position].classList.remove('active')
                }
                items[position].hidden = true
            }
        }
    }

    resetRoot() {
        if (this.root.childElementCount > 0) {
            for (const element of this.root.children) {
                element.remove()
            }
        }
    }

    attributeChangedCallback(attr: any, oldVal: any, newVal: any) {
        if (attr === 'timer') {
            if (oldVal !== newVal) {
                this.timer = parseInt(newVal)
            }
        }

        if (attr === 'content') {
            if (oldVal !== newVal) {
                this.listItems = JSON.parse(newVal)
                this.render()
            }
        }

        if (attr === 'loading') {
            if (oldVal !== newVal) {
                this.loading = (newVal === 'true')
            }
        }

        if (attr === 'type') {
            if (oldVal !== newVal) {
                this.type = newVal
            }
        }
    }
}
