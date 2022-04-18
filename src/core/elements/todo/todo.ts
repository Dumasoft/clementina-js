import {GlobalElement} from "../global.element";
import {ConfigureApi} from "../../api/settings/configure.api";

export class Todo extends GlobalElement {
    private readonly base_url: string
    private readonly id_todo = 'list-notes'

    constructor(options: any, document: Document) {
        super(options, document)
        this.base_url = window.location.origin
        this.load_events()
    }

    load_events() {
        if (document.getElementById(this.id_todo)) {
            const tasks: NodeList = document.querySelectorAll('.check-note')

            for (const task of tasks) {
                this.check_task(task as HTMLElement);
            }
        }
    }

    check_task(task: HTMLElement) {
        task.addEventListener('change', (event: Event) => {
            const element = event.target as HTMLElement
            const id = element.getAttribute('data-id')

            const list_events = document.getElementById(this.id_todo)

            if (list_events) {
                const data = new FormData()
                const configure_api = new ConfigureApi()
                const headers = configure_api.prepare_header_token(list_events)

                const url = `${this.base_url}/api/v1/todo/taks/${id}/`

                data.append('done', 'true')

                fetch(url, {method: 'PATCH', headers: headers, body: data})
                    .then((response: Response) => response.json())
                    .then((data: any) => {
                        console.log(data)
                    })
                    .catch((error) => console.log('ERROR', error))
            }
        })
    }
}
