import {GlobalElement} from "../global.element";
import {IOptionsMenu} from "../../interfaces/i.options.menu";

export class AccountAdmin extends GlobalElement {
    constructor(options: IOptionsMenu | null, document: Document) {
        super(options, document)

        this.load_events()
    }

    load_events() {
        const limit = document.getElementById('limits-profile')
        const url = limit ? limit.getAttribute('data-url') : ''

        console.log('CARGANDO DATOS DE ARCHIVOS')
        fetch(url ? url : '', {method: 'GET'})
            .then((response: Response) => response.text())
            .then((data: any) => {
                if (limit) {
                    limit.innerHTML = data
                }
            })
            .catch((error: any) => console.log(error))
    }
}
