import { GlobalElement } from '../GlobalElement'
import { IOptionsLayout } from '../../interfaces/IOptionsLayout'

export class Layout extends GlobalElement {

    constructor(options: IOptionsLayout, document: Document) {
        super(options, document)

        if (this.is_dark_mode()) {
            document.body.parentElement!.classList.add('dark-theme')
        }
    }

    private is_dark_mode(): boolean {
        if (this.getOptions().check_operation_system) {
            return window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches &&
                !localStorage.getItem('mode-web')
        }

        return localStorage.getItem('mode-web') === 'dark'
    }
}
