import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { IElementsWithEvent } from '../../interfaces/elements/IElementsWithEvent';
import { ElementsHTML, MethodsHttp, CustomGrid, CustomUploadZone } from '../../enums/general';

export class UploadZone implements IElementsWithEvent {
    private readonly options: any;
    private readonly document: Document;
    private readonly files: Array<File>;
    private form: HTMLFormElement;

    constructor(options: any, document: Document) {
        this.options = options;
        this.document = document;
        this.files = [];
    }

    create(element: HTMLElement): Observable<string> {
        this.form = this.document.createElement(ElementsHTML.FORM);
        this.form.setAttribute('method', MethodsHttp.POST);
        this.form.setAttribute('enctype', 'multipart/form-data');

        const div: HTMLDivElement = this.document.createElement(ElementsHTML.DIV);
        div.classList.add(CustomGrid.FILA);
        div.setAttribute('id', CustomUploadZone.ZONA_SUBIDA);

        this.form.appendChild(div);
        element.appendChild(this.form);

        return this.setEvents(div);
    }

    setEvents(element: HTMLElement): Observable<string> {
        return new Observable<string>((observer: Subscriber<string>) => {
            element.ondrop = (event: Event) => {
                event.preventDefault();
                observer.next('drop');
            };

            element.ondragover = (event: Event) => {
                event.preventDefault();
                observer.next('dragover');
            };

            element.ondragleave = (event: Event) => {
                event.preventDefault();
                observer.next('dragleave');
            };
        });
    }

    get(): HTMLElement {
        return this.form;
    }

    upload(files: Array<File>) {
        const uploadZone = this.document.getElementById(CustomUploadZone.ZONA_SUBIDA);
        uploadZone.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            this.files.push(files[i]);

            const file = this.document.createElement(ElementsHTML.DIV);
            file.classList.add(CustomUploadZone.ARCHIVO);
            file.classList.add(CustomGrid.ES_4);
            file.classList.add(CustomGrid.POR_4);
            file.classList.add(CustomGrid.TA_4);
            file.classList.add(CustomGrid.MO_12);
        }
    }

    getFiles(): Array<File> {
        return this.files;
    }
}
