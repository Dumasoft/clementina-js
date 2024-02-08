import {GlobalElement} from '../global.element'
import {TypeEvent} from '../../enums/events/type.event'
import {ElementModal} from '../../enums/elements/element.modal'
import {IOptionsModal} from '../../interfaces/i.options.modal'
import {SIMPLE_MODAL, SIMPLE_MODAL_FOOTER} from '../../constants/mocks/mock.modal'

export class Modal extends GlobalElement {
    constructor(options: IOptionsModal, document: Document) {
        super(options, document)
    }

    create(element?: HTMLElement) {
        const modal = document.createElement('div')
        modal.innerHTML = this.replace_mock()

        element = (element) ? element : this.getDocument().body
        element.appendChild(modal)

        this.create_event_close_modal()
    }

    private replace_mock(): string {
        return SIMPLE_MODAL
            .replace(ElementModal.ID, this.get_id())
            .replace(ElementModal.TITLE, this.getOptions().title)
            .replace(ElementModal.MESSAGE, this.getOptions().message)
            .replace(ElementModal.FOOTER, (this.getOptions().footer) ? SIMPLE_MODAL_FOOTER : '')
    }

    create_event_close_modal() {
        const modal = document.getElementById(this.get_id())
        if (modal) {
            modal.querySelector('.modal--close')!.addEventListener(TypeEvent.CLICK, (event) => {
                event.preventDefault()
                this.destroy()
            })
        }
    }

    accept(callback?: Function) {
        const button_accept = document.getElementById('modal-acept')
        if (button_accept) {
            this.prepare_event(TypeEvent.CLICK, button_accept, callback)
        }
    }

    cancel(callback?: Function) {
        const button_cancel = document.getElementById('modal-cancel')
        if (button_cancel) {
            this.prepare_event(TypeEvent.CLICK, button_cancel, callback)
        }
    }

    private prepare_event(type_event: TypeEvent, element: HTMLElement, callback?: Function) {
        if (callback) {
            element.addEventListener(type_event, (event) => {
                event.preventDefault()
                callback()
                this.destroy()
            })
        } else {
            if (element.parentNode) {
                element.parentNode.removeChild(element)
            }
        }
    }
}
