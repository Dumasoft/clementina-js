import { IElements } from '../interfaces/IElements';

export class GlobalElement implements IElements {
    private readonly options: any;
    private readonly document: Document;

    constructor(options: any, document: Document) {
        this.options = options;
        this.document = document;
    }

    create(element: HTMLBRElement): void {
        throw new Error('Method not implemented.');
    }

    get(): HTMLElement {
        throw new Error('Method not implemented.');
    }

    getOptions(): any {
        return this.options;
    }

    getDocument(): Document {
        return this.document;
    }

    destroy(): void {
        throw new Error('Method not implemented.');
    }
}
