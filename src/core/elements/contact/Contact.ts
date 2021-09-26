import {existsClass} from '../../util/functions'
import {Alert} from "../alert/Alert";
import {TypeSystemMessages} from "../../enums/events/TypeSystemMessages";

export class Contact {
    private readonly base_url: string

    constructor() {
        this.base_url = window.location.origin
        this.createEvents()
    }

    createEvents() {
        if (existsClass('#form-contact', document)) {
            const form = document.getElementById('form-contact')
            form!.addEventListener('submit', (event: any) => {
                event.preventDefault()
                const data = new FormData()
                const headers = {'X-CSRFToken': ''}

                form!.querySelectorAll('input').forEach((input: any) => {
                    if (input.name !== 'csrfmiddlewaretoken' && input.name !== 'button-submit') {
                        data.append(input.name, input.value)
                        input.value = ''
                    }

                    if (input.name === 'csrfmiddlewaretoken') {
                        headers['X-CSRFToken'] = input.value
                    }
                })



                const textarea = form!.querySelector('textarea')
                data.append(textarea!.name, textarea!.value)
                textarea!.value = ''

                this.loadLoading(true)

                const url = `${this.base_url}/api/v1/communication/contact/`
                fetch(url, {method: 'POST', headers: headers, body: data})
                    .then((response: Response) => response.json())
                    .then((data: any) => {
                        this.loadLoading(false)
                        this.showAlert('El mensaje se ha enviado.', TypeSystemMessages.SUCCESS)
                    })
                    .catch((error: any) => {
                        console.error('Error al enviar el formulario', error)
                        this.showAlert(
                            'No se ha podido enviar el formulario, Por favor inténtalo más tarde',
                            TypeSystemMessages.ERROR
                        )
                    })
            })
        }
    }

    loadLoading(show: boolean) {
        const button = document.getElementById('send-message')
        const div_loading = document.getElementById('form-contact')

        if (button) {
            button.hidden = show

            if (div_loading) {
                if (show) {
                    const div = document.createElement('div')
                    div.classList.add('loading')
                    div_loading.appendChild(div)
                } else {
                    const loading = div_loading.querySelector('.loading')
                    if (loading) {
                        loading.parentNode!.removeChild(loading)
                    }
                }
            }
        }
    }

    showAlert(message: string, type: TypeSystemMessages) {
        const alert = new Alert({destroy: true}, document)
        const div_loading = document.getElementById('form-contact')

        if (div_loading) {
            alert.create(div_loading, type, message)
        }
    }
}
