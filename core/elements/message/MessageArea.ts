import { GlobalElement } from "../GlobalElement";
import { IElementsWithMessage, ITypeMessage } from '../../interfaces';
import {
    TypeMessage,
    TypeIcon,
    CustomMessage,
    ElementsHTML,
    CustomGrid
} from "../../enums";
import { TypeSystemMessages } from "../../enums/events/TypeSystemMessages";

export class MessageArea extends GlobalElement implements IElementsWithMessage {
    private readonly types: Array<ITypeMessage>;
    private readonly time = 2500;

    constructor(options: any, document: Document) {
        super(options, document);

        this.types = [
            {class: TypeMessage.SUCCESS, icon: TypeIcon.SUCCESS},
            {class: TypeMessage.WARNING, icon: TypeIcon.WARNING},
            {class: TypeMessage.ERROR, icon: TypeIcon.ERROR},
        ];
    }

    create(element: HTMLElement, type?: TypeSystemMessages, message?: string) {
        // this.destroy();

        console.log(this.getDocument());


        const name = CustomMessage.MESSAGE;
        // const area = this.getDocument().getElementById(name);
        const alert = this.getDocument().createElement(ElementsHTML.DIV);
        alert.classList.add(name);
        alert.classList.add(CustomGrid.FILA);
        const textDiv = this.getDocument().createElement(ElementsHTML.DIV);
        const iconDiv = this.getDocument().createElement(ElementsHTML.DIV);
        iconDiv.classList.add(CustomMessage.ICON);
        textDiv.classList.add(CustomMessage.TEXT);
        textDiv.innerHTML = message;

        iconDiv.appendChild(this.getIcon(type, alert));
        alert.appendChild(iconDiv);
        alert.appendChild(textDiv);
        element.appendChild(alert);

        setTimeout(() => this.destroy(), this.time);
    }

    getIcon(type: TypeSystemMessages, alert: HTMLDivElement): HTMLElement {
        const i = this.getDocument().createElement(ElementsHTML.I);
        i.classList.add(CustomMessage.ICONS);

        switch (type) {
            case TypeSystemMessages.SUCCESS:
                alert.classList.add(this.types[0].class);
                i.classList.add(this.types[0].icon);
                break;
            case TypeSystemMessages.WARNING:
                alert.classList.add(this.types[1].class);
                i.classList.add(this.types[1].icon);
                break;
            case TypeSystemMessages.ERROR:
                alert.classList.add(this.types[2].class);
                i.classList.add(this.types[2].icon);
                break;
        }

        return i;
    }

    destroy(): void {
        const nameClass = '.' + CustomMessage.MESSAGE;
        if (this.getDocument().querySelector(nameClass)) {
            const message = this.getDocument().querySelector(nameClass);
            message.parentNode.removeChild(message);
        }
    }
}
