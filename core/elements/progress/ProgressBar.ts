import { ElementsHTML } from '../../enums/html/ElementsHTML';
import { CustomProgressBar } from '../../enums/html/custom/CustomProgressBar';
import { GlobalElement } from '../GlobalElement';

export class ProgressBar extends GlobalElement {
    private bar: HTMLElement;

    create(element: HTMLBRElement): void {
        this.bar = this.getDocument().createElement(ElementsHTML.DIV);
        this.bar.setAttribute('id', CustomProgressBar.BARRA_PROGRESO);
        this.bar.classList.add(CustomProgressBar.BARRA_PROGRESO);
        const div: HTMLDivElement = this.getDocument().createElement(ElementsHTML.DIV);
        this.bar.appendChild(div);
        element.appendChild(this.bar);
    }

    get(): HTMLElement {
        return this.bar;
    }
}
