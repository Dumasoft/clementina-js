import {GlobalElement} from '../global.element'
import {TypeEvent} from '../../enums/events/type.event'
import {ElementModal, IDSModal} from '../../enums/elements/element.modal'
import {IOptionsModal} from '../../interfaces/i.options.modal'

export class Modal extends GlobalElement {
    private modal: HTMLElement | null = null
    private button_general: HTMLElement | null = null
    private button_download: HTMLElement | null = null
    private menu_download: HTMLElement | null = null
    private menu_general: HTMLElement | null = null
    private download_pdf: HTMLElement | null = null
    private download_doc: HTMLElement | null = null
    private download_md: HTMLElement | null = null
    private delete_note: HTMLElement | null = null
    private urls: Record<string, string> = {}
    private csrf: string | null = null
    private id: string | null = null

    constructor(options: IOptionsModal, document: Document) {
        super(options, document)
    }

    create(element?: HTMLElement) {
        this.modal = document.createElement('div')
        this.modal.innerHTML = this.replace_mock()

        element = (element) ? element : this.getDocument().body
        element.appendChild(this.modal)

        this.button_download = this.modal?.querySelector(IDSModal.BUTTON_DOWNLOAD_OPTION)
        this.button_general = this.modal?.querySelector(IDSModal.BUTTON_GENERAL_OPTION)
        this.menu_download = this.modal?.querySelector<HTMLElement>(IDSModal.MENU_DOWNLOAD)
        this.menu_general = this.modal?.querySelector<HTMLElement>(IDSModal.MENU_GENERAL)

        this.download_pdf = this.modal?.querySelector(IDSModal.DOWNLOAD_PDF)
        this.download_doc = this.modal?.querySelector(IDSModal.DOWNLOAD_DOC)
        this.download_md = this.modal?.querySelector(IDSModal.DOWNLOAD_MD)
        this.delete_note = this.modal?.querySelector(IDSModal.DELETE_NOTE)

        this.create_event_close_modal()
        this.crete_event_options()
    }

    private replace_mock(): string {
        return this.getOptions()
            .mock_modal
            .replace(ElementModal.ID, this.get_id())
            .replace(ElementModal.TITLE, this.getOptions().title)
            .replace(ElementModal.MESSAGE, this.getOptions().message)
            .replace(ElementModal.FOOTER, (this.getOptions().footer) ? this.getOptions().mock_footer : '')
    }

    create_event_close_modal() {
        this.modal?.querySelector(IDSModal.CLOSE)?.addEventListener(TypeEvent.CLICK, (event) => {
            event.preventDefault()
            console.log('cerrar modal')
            this.destroy()
        })
    }

    crete_event_options() {
        this.button_download?.addEventListener(TypeEvent.CLICK, (event) => {
            event.preventDefault()

            if (this.menu_download) {
                this.menu_download.style.display = this.menu_download.style.display === 'block' ? 'none' : 'block'
            }

            if (this.menu_general) {
                this.menu_general.style.display = 'none'
            }
        })

        this.button_general?.addEventListener(TypeEvent.CLICK, (event) => {
            event.preventDefault()

            if (this.menu_download) {
                this.menu_download.style.display = 'none'
            }

            if (this.menu_general) {
                this.menu_general.style.display = this.menu_general.style.display === 'block' ? 'none' : 'block'
            }
        })

        this.download_pdf?.addEventListener(TypeEvent.CLICK, (event) => {
            event.preventDefault()
            this.donwload_file(this.urls['url_pdf'])
        })

        this.download_doc?.addEventListener(TypeEvent.CLICK, (event) => {
            event.preventDefault()
            this.donwload_file(this.urls['url_doc'])
        })

        this.download_md?.addEventListener(TypeEvent.CLICK, (event) => {
            event.preventDefault()
            this.donwload_file(this.urls['url_md'])
        })
    }

    donwload_file(url: string) {
        const link = document.createElement("a")
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        if (this.menu_download) {
            this.menu_download.style.display = 'none'
        }
    }

    accept(callback?: Function) {
        const button_accept = this.modal?.querySelector(IDSModal.BUTTON_ACCEPT) as HTMLButtonElement
        if (button_accept) {
            this.prepare_event(TypeEvent.CLICK, button_accept, callback)
        }
    }

    cancel(callback?: Function) {
        const button_cancel = this.modal?.querySelector(IDSModal.BUTTON_CANCEL) as HTMLButtonElement
        if (button_cancel) {
            this.prepare_event(TypeEvent.CLICK, button_cancel, callback)
        }
    }

    delete(callback?: Function) {
        if (this.delete_note) {
            this.prepare_event(TypeEvent.CLICK, this.delete_note, callback)
        }
    }

    close() {
        this.destroy()
    }

    save_urls(urls: Record<string, string>) {
        this.urls = urls
    }

    private prepare_event(type_event: TypeEvent, element: HTMLElement, callback?: Function) {
        if (callback) {
            element.addEventListener(type_event, (event) => {
                event.preventDefault()
                callback()
            })
        } else {
            if (element.parentNode) {
                element.parentNode.removeChild(element)
            }
        }
    }
}
