import { IElements } from '../../interfaces/elements/IElements';
import { ElementsHTML } from '../../enums/html/ElementsHTML';
import { CustomProgressBar } from '../../enums/html/custom/CustomProgressBar';

export class ProgressBar implements IElements {
    private readonly options: any;
    private readonly document: Document;
    private bar: HTMLElement;

    constructor(options: any, document: Document) {
        this.options = options;
        this.document = document;
    }

    create(element: HTMLBRElement): void {
        this.bar = this.document.createElement(ElementsHTML.DIV);
        this.bar.setAttribute('id', CustomProgressBar.BARRA_PROGRESO);
        this.bar.classList.add(CustomProgressBar.BARRA_PROGRESO);
        const div: HTMLDivElement = this.document.createElement(ElementsHTML.DIV);
        this.bar.appendChild(div);
        element.appendChild(this.bar);
    }

    get(): HTMLElement {
        return this.bar;
    }
}
