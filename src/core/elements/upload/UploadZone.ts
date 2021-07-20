import { GlobalElement } from '../GlobalElement'
import { IElementsWithEvent } from '../../interfaces/IElementsWithEvent'
import { ElementsHTML } from '../../enums/html/ElementsHTML'
import {CustomGrid} from "../../enums/html/custom/CustomGrid";
import {CustomUploadZone} from "../../enums/html/custom/CustomUploadZone";


export class UploadZone extends GlobalElement implements IElementsWithEvent {
    private readonly files: Array<File> = []
    private form: HTMLFormElement = this.getDocument().createElement(ElementsHTML.FORM)

    /*create(element: HTMLElement): Observable<string> {
        this.form = this.getDocument().createElement(ElementsHTML.FORM)
        this.form.setAttribute('method', MethodsHttp.POST)
        this.form.setAttribute('enctype', 'multipart/form-data')

        const div: HTMLDivElement = this.getDocument().createElement(ElementsHTML.DIV)
        div.classList.add(CustomGrid.FILA)
        div.setAttribute('id', CustomUploadZone.ZONA_SUBIDA)

        this.form.appendChild(div)
        element.appendChild(this.form)

        return this.setEvents(div)
    }*/

    /*setEvents(element: HTMLElement): Observable<string> {
        return new Observable<string>((observer: Subscriber<string>) => {
            element.ondrop = (event: Event) => {
                event.preventDefault()
                observer.next('drop')
            }

            element.ondragover = (event: Event) => {
                event.preventDefault()
                observer.next('dragover')
            }

            element.ondragleave = (event: Event) => {
                event.preventDefault()
                observer.next('dragleave')
            }
        })
    }*/

    get(): HTMLElement {
        return this.form
    }

    upload(files: Array<File>) {
        const uploadZone = this.getDocument().getElementById(CustomUploadZone.ZONA_SUBIDA)

        if (uploadZone) {
            uploadZone.innerHTML = ''
        }

        for (let i = 0; i < files.length; i++) {
            this.files.push(files[i])

            const file = this.getDocument().createElement(ElementsHTML.DIV)
            file.classList.add(CustomUploadZone.ARCHIVO)
            file.classList.add(CustomGrid.ES_4)
            file.classList.add(CustomGrid.POR_4)
            file.classList.add(CustomGrid.TA_4)
            file.classList.add(CustomGrid.MO_12)
        }
    }

    getFiles(): Array<File> {
        return this.files
    }
}
