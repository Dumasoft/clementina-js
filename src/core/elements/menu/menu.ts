import {GlobalElement} from '../global.element'
import {IOptionsMenu} from '../../interfaces/i.options.menu'
import {TypeEvent} from '../../enums/events/type.event'
import {ElementMenu} from "../../enums/elements/element.menu";

export class Menu extends GlobalElement {

    constructor(options: IOptionsMenu | null, document: Document) {
        super(options, document)

        this.create_event_show_menu()
    }

    create_event_show_menu() {
        const element = this.getDocument().getElementById(ElementMenu.ID_EVENT_SHOW_MENU)
        if (element) {
            element.addEventListener(TypeEvent.CLICK, (event) => {
                event.preventDefault()

                const smarthphone_menu = document.getElementById(ElementMenu.ID_MENU)
                if (smarthphone_menu) {
                    smarthphone_menu.style.display = (smarthphone_menu.style.display === 'block') ? 'none' : 'block'
                }
            })
        }
    }
}
