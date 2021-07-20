import { GlobalElement } from '../GlobalElement'
import { IOptionsMenu } from '../../interfaces/IOptionsMenu'
import { TypeEvent } from '../../enums/events/TypeEvent'
import {ElementMenu} from "../../enums/elements/ElementMenu";

export class Menu extends GlobalElement {

    constructor(options: IOptionsMenu, document: Document) {
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