import {GlobalElement} from '../global.element'
import {TypeEvent} from '../../enums/events/type.event'
import {ElementModal} from '../../enums/elements/element.modal'
import {IOptionsModal} from '../../interfaces/i.options.modal'
import {SIMPLE_MODAL} from '../../constants/mocks/mock.modal'

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
}
