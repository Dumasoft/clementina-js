import { GlobalElement } from '../GlobalElement'
import { ITypeMessage } from '../../interfaces/ITypeMessage'
import { IElementsWithMessage } from '../../interfaces/IElementsWithMessage'
import { TypeMessage } from '../../enums/messages/TypeMessage'
import { TypeIcon } from '../../enums/icons/TypeIcon'
import { TypeSystemMessages } from '../../enums/events/TypeSystemMessages'
import { ElementAlert } from '../../enums/elements/ElementAlert'
import { IOptionsAlert } from '../../interfaces/IOptionsAlert'
import { NORMAL_ALERT } from '../../constants/mocks/MockAlert'


export class Alert extends GlobalElement implements IElementsWithMessage {
    private readonly types: Array<ITypeMessage>
    private readonly time = 2500

    constructor(options: IOptionsAlert, document: Document) {
        super(options, document)

        this.types = [
            {class: TypeMessage.SUCCESS, icon: TypeIcon.SUCCESS},
            {class: TypeMessage.WARNING, icon: TypeIcon.WARNING},
            {class: TypeMessage.ERROR, icon: TypeIcon.ERROR},
        ]
    }

    create(element?: HTMLElement, type?: TypeSystemMessages, message?: string) {
        const typeSelected = this.get_type_and_icon((type) ? type : TypeSystemMessages.SUCCESS)
        const alert = document.createElement('div')
        alert.innerHTML = this.replace_mock(typeSelected.class, typeSelected.icon, (message) ? message : '')

        element = (element) ? element : this.getDocument().body
        element.appendChild(alert)

        if (this.getOptions().destroy) {
            setTimeout(() => this.destroy(), this.time)
        }
    }

    private replace_mock(type: string, icon: string, message: string): string {
        return NORMAL_ALERT
            .replace(ElementAlert.ICON, icon)
            .replace(ElementAlert.TYPE, type)
            .replace(ElementAlert.MESSAGE, message)
            .replace(ElementAlert.ID, this.get_id())
    }

    get_type_and_icon(type: TypeSystemMessages): {'class': string, icon: string } {
        switch (type) {
            case TypeSystemMessages.SUCCESS:
                return this.types[0]
            case TypeSystemMessages.WARNING:
                return this.types[1]
            case TypeSystemMessages.ERROR:
                return this.types[2]
        }
    }
}
