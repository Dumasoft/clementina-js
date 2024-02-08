import {Menu} from './elements/menu/menu'
import {Layout} from './elements/layout/layout'
import {Note} from './notes/note'
import {AccountAdmin} from './elements/account/account.admin'
import {LogViewer} from './elements/logviewer/log.viewer'
import {Contact} from './elements/contact/contact'
import {ConfigureAdmin} from './elements/admin/configure.admin'
import {Editor} from './elements/editor/editor';
import {MDEditor} from "./elements/editor/md.editor";
import {PanelSelector} from "./elements/panel/panel.selector";
import {URLS} from "./util/urls";

export class BookRiders {
    constructor(name_app: string) {
        console.log(`%c Bienvenido a ${name_app}`, 'color: #990000; font-size: 15px; font-weight: bold;')
        this.load_general()
        this.load_provisional()
    }

    load_general() {
        new Menu(null, document)
        new Layout({check_operation_system: false}, document)
        new Note(null, document)
        new AccountAdmin({urls: URLS['BOOKRIDERS']}, document)
        new LogViewer()
        let contact = new Contact()
        contact.change_base_url('https://dumasoft.io')
        new ConfigureAdmin()
        new Editor()
        new MDEditor()
        new PanelSelector()
    }

    // TODO: RECOLOCAR
    load_provisional () {
        if (document.querySelector('.flatpickr-time-date')) {
            // @ts-ignore
            flatpickr('.flatpickr-time-date', {
                dateFormat: 'd/m/Y'
            });
        }

        if (document.querySelector('.flatpickr-time-hour')) {
            // @ts-ignore
            flatpickr('.flatpickr-time-hour', {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true
            });
        }

        setTimeout(() => {
            const closes: NodeListOf<HTMLElement> = document.querySelectorAll('.editormd-preview-close-btn')

            for (let i = 0; i < closes.length; i++) {
                const close_preview = closes[i]
                close_preview.style.display = 'none'
            }
        }, 1000)
    }
}



