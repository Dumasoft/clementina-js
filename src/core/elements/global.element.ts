import {IElements} from '../interfaces/i.elements'
import {get_uuid4} from '../util/functions'


export class GlobalElement implements IElements {
    private readonly options: any
    private readonly document: Document
    private readonly id_message: string

    constructor(options: any, document: Document) {
        this.options = options
        this.document = document
        this.id_message = get_uuid4()
    }

    create(element: HTMLBRElement): void {
        throw new Error('Method not implemented.')
    }

    get(): HTMLElement {
        throw new Error('Method not implemented.')
    }

    getOptions(): any {
        return this.options
    }

    getDocument(): Document {
        return this.document
    }

    get_id(): string {
        return this.id_message
    }

    destroy(): void {
        if (this.getDocument().getElementById(this.id_message)) {
            const element = this.getDocument().getElementById(this.id_message)

            if (element) {
                const parent = element.parentNode!
                parent.parentNode!.removeChild(parent)
            }
        }
    }
}
