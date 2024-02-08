import {MarkdownConversor} from "../editor/markdown.conversor";

export class PanelSelector {
    constructor() {
        this.prepare()
    }

    prepare() {
        const panel_elements = document.querySelectorAll('.panel .nav-tabs li')
        for (let element of panel_elements) {
            element.addEventListener('click', () => {
                const id = element.getAttribute('data-id')

                if (element.parentNode && element.parentNode.parentNode && id) {
                    const tab_panel = element.parentNode.querySelector('li.active')

                    if (tab_panel) {
                        tab_panel.classList.remove('active')
                        element.classList.add('active')

                        const panel_body = element.parentNode.parentNode.querySelector('.panel--body .tab-pane.active')
                        if (panel_body) {
                            panel_body.classList.remove('active')

                            const tab_selected = document.getElementById(id)

                            if (tab_selected) {
                                tab_selected.classList.add('active')

                                if (id == 'preview-editor') {
                                    const markdown_conversor = new MarkdownConversor()
                                    const url = element.getAttribute('data-url')
                                    markdown_conversor.preview(url ? url : '')
                                }
                            }
                        }
                    }
                }
            })
        }
    }
}
