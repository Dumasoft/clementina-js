import {show_hide_element} from "../../util/functions";

export class Editor {
    private child_notes: NodeListOf<HTMLInputElement> | undefined

    constructor() {
        this.prepareElements()
        this.createEvents()
    }

    prepareElements() {
        this.child_notes = document.querySelectorAll('.show-content-lector')
    }

    createEvents() {
        this.eventShowNotesLector()
    }

    eventShowNotesLector() {
        if (this.child_notes) {
            for (let note of this.child_notes) {
                note.addEventListener('click', function () {
                    // @ts-ignore
                    const content: HTMLElement | null = note
                        .parentNode
                        .parentNode
                        .parentNode
                        .querySelector('.presentation-grid--content')

                    const i = note.querySelector('i')

                    const show = show_hide_element(content)

                    if (i) {
                        i.classList.remove((show) ? 'fa-chevron-right' : 'fa-chevron-down')
                        i.classList.add((show) ? 'fa-chevron-down' : 'fa-chevron-right')
                    }
                })
            }
        }
    }
}
