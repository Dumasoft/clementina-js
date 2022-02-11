import {GlobalElement} from '../global.element'
import {IOptionsLayout} from '../../interfaces/i.options.layout'

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
