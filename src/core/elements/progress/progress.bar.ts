import {GlobalElement} from '../global.element'
import {ElementsHTML} from '../../enums/html/ElementsHTML'
import {CustomProgressBar} from '../../enums/html/custom/custom.progress.bar'

export class ProgressBar extends GlobalElement {
    private bar: HTMLElement = this.getDocument().createElement(ElementsHTML.DIV)

    create(element: HTMLBRElement): void {
        this.bar.setAttribute('id', CustomProgressBar.BARRA_PROGRESO)
        this.bar.classList.add(CustomProgressBar.BARRA_PROGRESO)
        const div: HTMLDivElement = this.getDocument().createElement(ElementsHTML.DIV)
        this.bar.appendChild(div)
        element.appendChild(this.bar)
    }

    get(): HTMLElement {
        return this.bar
    }
}
