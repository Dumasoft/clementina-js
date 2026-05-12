import {GlobalElement} from "../elements/global.element";
import {Modal} from "../elements/modal/modal";
import {IOptionsModal} from "../interfaces/i.options.modal";
import {NOTE_MODAL, NOTE_MODAL_FOOTER} from "../constants/mocks/mock.modal";
import {MDEditor} from "../elements/editor/md.editor";
import {PanelSelector} from "../elements/panel/panel.selector";
import {MethodsHttp} from "../enums/http/methods.http";
import {TypeEvent} from "../enums/events/type.event";
import {HttpRequest} from "../enums/http/http.request";

export class Note extends GlobalElement {
    private updating = false

    constructor(options: any, document: Document) {
        super(options, document);
        this.load_events()
    }

    load_events() {
        this.get_notes()
    }

    get_notes() {
        const div_notes = document.getElementById('list_notes')

        if (div_notes) {
            const url = div_notes.dataset.url

            if (url) {
                const request = new HttpRequest(MethodsHttp.GET, url)
                request.prepare_content()
                request.call()
                    .then((data) => {
                        div_notes.innerHTML = data.html

                        this.expand_notes()
                        this.new_note()
                        this.edit_notes()
                    })
            }
        }
    }

    new_note() {
        const list_new_notes = document.querySelectorAll('.btn-new-note')

        for (const note of list_new_notes) {
            note.addEventListener(TypeEvent.CLICK, (evt) => {
                const element = evt.currentTarget as HTMLElement
                const id = element?.dataset.id
                const url = element?.dataset.url

                if (url) {
                    const options: IOptionsModal = {
                        title: 'Nueva nota',
                        message: 'Nueva nota',
                        mock_modal: NOTE_MODAL,
                        mock_footer: NOTE_MODAL_FOOTER,
                        footer: true
                    }
                    const modal = new Modal(options, document)
                    modal.create()

                    const field_parent = this.getFieldByName('parent') as HTMLInputElement
                    if (field_parent && parent) {
                        field_parent.value = id ?? ''
                    }

                    modal.cancel(() => {
                        modal.close()
                    })

                    modal.accept(() => {
                        this.save_note(modal, url, MethodsHttp.POST)
                    })


                    new MDEditor()
                    new PanelSelector()
                }
            })
        }
    }

    edit_notes() {
        const notes = document.querySelectorAll('.note .edit--note')

        notes.forEach((note) => {
            note.addEventListener('click', (evt) => {
                const element = evt.currentTarget as HTMLElement
                const data = this.getDatasetNote(element)
                const urls = data.urls

                const options: IOptionsModal = {
                    title: `Editar nota`,
                    message: '',
                    mock_modal: NOTE_MODAL,
                    mock_footer: NOTE_MODAL_FOOTER,
                    footer: true
                }

                const modal = new Modal(options, document)
                modal.create()

                modal.save_urls(urls)

                modal.delete(() => {
                    if (!this.updating) {
                        this.delete_note(modal, urls['url_note'])
                    }

                    this.updating = true
                })

                modal.cancel(() => {
                    modal.close()
                })

                modal.accept(() => {

                    if (!this.updating) {
                        this.save_note(modal, urls['url_note'], MethodsHttp.PATCH)
                    }

                    this.updating = true
                })

                this.setValuesInInputs(data)

                new MDEditor()
                new PanelSelector()
            })
        })
    }

    private setValuesInInputs(data: Record<string, any>) {
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'urls') return

            const field = this.getFieldByName(key) as HTMLInputElement
            if (field && value) {
                field.value = value
            }
        })
    }

    private getDatasetNote(element: HTMLElement) {
        const dataset = element.dataset

        return {
            id: dataset.id,
            book: dataset.book,
            parent: dataset.parent,
            title: dataset.title,
            order: dataset.order,
            text: dataset.text,
            urls: {
                url_pdf: dataset.urlpdf ?? '',
                url_doc: dataset.urldoc ?? '',
                url_md: dataset.urlmd ?? '',
                url_note: dataset.urlnote ?? ''
            }
        }
    }

    get_book_id(): string {
        const book_data = document.getElementById('book-data')
        const id =  book_data?.dataset.id
        return (id) ? id : ''
    }



    get_fields() {
        return document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
            '.modal input, .modal textarea'
        );
    }

    getFieldByName(name: string) {
        return Array.from(this.get_fields()).find(f => f.name === name);
    }

    save_note(modal: Modal, url: string, method: MethodsHttp) {
        const fields = Array.from(this.get_fields()) as HTMLInputElement[]
        const values = this.getFieldValues(fields)

        values['book'] = this.get_book_id()

        if (!this.validateRequired(fields, values)) {
            return
        }

        if (!this.get_csrf()) {
            modal.close()
            return
        }

        this.updating = true

        const request: HttpRequest = new HttpRequest(method, url)
        request.prepare_content(values)

        request.call()
            .then(() => {
                this.updating = false
                this.refresh_notes()
                modal.close()
            })
            .catch((error: any) => {
                this.updating = false
                console.error(error)
            })
    }

    private getFieldValues(fields: Iterable<HTMLInputElement>): Record<string, string> {
        return Object.fromEntries(
            Array.from(fields).map(field => [field.name, field.value])
        )
    }

    private validateRequired(fields: HTMLInputElement[], values: Record<string, string>): boolean {
        let valid = true

        const requiredFields = ['title', 'order']

        requiredFields.forEach(name => {
            const input = Array.from(fields).find(f => f.name === name)
            const span = input?.parentNode?.querySelector('span')

            if (span) span.innerText = ''

            if (!values[name]) {
                if (span) {
                    span.innerText = 'Este campo es necesario'
                    span.classList.add('info')
                }
                valid = false
            }
        })

        return valid
    }

    get_csrf(): string {
        const input_csrf = document.querySelector('input[name="csrfmiddlewaretoken"]') as HTMLInputElement
        return input_csrf.value
    }

    refresh_notes(): void {
        const div_notes = document.getElementById('list_notes')
        if (div_notes) {
            div_notes.innerHTML = ''
        }
        this.get_notes()
    }

    delete_note(modal: Modal, url: string) {
        const request = new HttpRequest(MethodsHttp.DELETE, url)
        request.prepare_content()
        request.call()
            .then(() => {
                this.updating = false
                this.refresh_notes()
                modal.close()
            })
            .catch(() => {
                this.updating = false
                console.error("Error al eliminar")
            })
    }

    expand_notes() {
        const show_subnotes = document.querySelectorAll('.show-subnotes')
        show_subnotes.forEach((subnote) => {
            subnote.addEventListener('click', (evt) => {
                evt.preventDefault()

                const element = evt.currentTarget as HTMLElement

                if (element) {
                    const i = element.querySelector('i')

                    if (i) {
                        this.changeChevronIcon(i)
                    }

                    const parent = element.parentNode

                    const div_subnotes = parent?.querySelector('.subnotes--list') as HTMLElement

                    if (div_subnotes) {
                        div_subnotes.style.display = (div_subnotes.style.display === 'block') ? 'none' : 'block'
                    }
                }
            })
        })
    }

    private changeChevronIcon(element: HTMLElement) {
        if (element.classList.contains('fa-chevron-up')) {
            element.classList.remove('fa-chevron-up')
            element.classList.add('fa-chevron-down')
        } else {
            element.classList.add('fa-chevron-up')
            element.classList.remove('fa-chevron-down')
        }
    }
}
