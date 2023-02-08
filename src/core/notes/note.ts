import {GlobalElement} from "../elements/global.element";

export class Note extends GlobalElement {
    constructor(options: any, document: Document) {
        super(options, document);
        this.load_events()
    }

    load_events() {
        const expand_notes: NodeList = document.querySelectorAll('.note--expand')

        for (const expand of expand_notes) {
            expand.addEventListener('click', (event: Event) => {
                const element = event.target as HTMLElement
                const i = element.nodeName.toLowerCase() === 'i' ?
                    element : element.querySelector('i') as HTMLElement;

                //@ts-ignore
                const content = i.parentNode.parentNode.parentNode.parentNode.querySelector('.note--content')
                //@ts-ignore
                const documents = i.parentNode.parentNode.parentNode.parentNode.querySelector('.note--documents')

                if (i.classList.contains('fa-chevron-right')) {
                    i.classList.replace('fa-chevron-right', 'fa-chevron-down')
                    if (content) {
                        content.classList.add('active')
                    }
                    if (documents) {
                        documents.classList.add('active')
                    }
                } else {
                    i.classList.replace('fa-chevron-down', 'fa-chevron-right')
                    if (content) {
                        content.classList.remove('active')
                    }
                    if (documents) {
                        documents.classList.remove('active')
                    }
                }
            })
        }
    }
}
