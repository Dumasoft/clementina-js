import {GlobalElement} from '../global.element'
import {IOptionsMenu} from '../../interfaces/i.options.menu'
import {MethodsHttp} from '../../enums/http/methods.http'
import {HttpRequest} from '../../enums/http/http.request'
import {TypeEvent} from '../../enums/events/type.event'
import {get_full_url} from '../../util/functions'
import {INFO_USER} from '../../constants/mocks/mock.info.user'
import {Modal} from '../modal/modal'
import {IOptionsModal} from '../../interfaces/i.options.modal'

export class AccountAdmin extends GlobalElement {
    constructor(options: IOptionsMenu | null, document: Document) {
        super(options, document)

        this.load_events()
        this.move_button_upload_file()
        this.add_friend()
    }

    load_events() {
        const limit = document.getElementById('limits-profile')
        if (limit) {
            const data = new FormData()
            const id = limit.getAttribute('data-id')
            if (id) {
                data.append('user_id', id)

                const request: HttpRequest = new HttpRequest(
                    MethodsHttp.POST,
                    get_full_url(this.getOptions().urls['INFO_PROFILE']),
                )

                request.prepare_content(data)
                request.call()
                    .then((data: any) => {
                        limit.innerHTML = ''
                        const icon_books = 'fa-duotone fa-books'
                        const icon_notes = 'fa-duotone fa-notebook'
                        const icon_size = 'fa-duotone fa-memo-circle-info'
                        const total_books = this.get_info_profile(data['total_books'], ' libros', icon_books)
                        const total_notes = this.get_info_profile(data['total_notes'], ' notas', icon_notes)
                        const size = this.get_info_profile(data['size'], ' megas', icon_size)
                        limit.innerHTML = `${total_books}${total_notes}${size}`
                    })
                    .catch((error: any) => limit.innerHTML = '')
            }
        }
    }

    get_info_profile(data: number, text: string, icon_class: string): string {
        return INFO_USER
            .replace('{{ info_data }}', `${data} ${text}`)
            .replace('{{ icon }}', icon_class)
    }

    move_button_upload_file() {
        const button_image: HTMLElement | null  = document.getElementById('button_image_user')
        const div_button_image: HTMLElement | null = document.getElementById('button_image')

        if (button_image && div_button_image) {
            if (button_image.parentNode) {
                button_image.parentNode.removeChild(button_image)
            }

            div_button_image.appendChild(button_image)
        }
    }

    add_friend() {
        const form_request_friend = document.getElementById('form-request_friend')

        if (form_request_friend) {
            form_request_friend.addEventListener(TypeEvent.SUBMIT, (event: Event) => {
                event.preventDefault()
                const id_user= document.getElementById('id_user') as HTMLInputElement
                const id_friend = document.getElementById('id_friend') as HTMLInputElement
                let method = form_request_friend.getAttribute('method') as MethodsHttp
                method = method ? method : MethodsHttp.POST
                const url = form_request_friend.getAttribute('data-url')

                if (id_user && id_friend) {
                    const data = new FormData()
                    data.append('user_id', id_user.value)
                    data.append('friend_id', id_friend.value)
                    const request: HttpRequest = new HttpRequest(method, url)
                    request.prepare_content(data)
                    this.loading_friends(true)

                    form_request_friend.hidden = true

                    request.call()
                        .then((data: any) => {
                            const options: IOptionsModal = {
                                title: 'Solicitud enviada',
                                message: 'La solicitud se ha enviado correctamente, espera a que el usuario acepte tu solicitud.',
                                footer: true
                            }
                            const modal = new Modal(options, document)
                            modal.create()
                            modal.accept((event: Event) => {
                                window.location.reload()
                            })
                            modal.cancel()
                        })
                        .catch((error: any) => {
                            const options: IOptionsModal = {
                                title: 'Error al enviar la solicitud',
                                message: 'Error al enviar la solicitud, ponte en contacto con soporte.',
                                footer: true
                            }
                            const modal = new Modal(options, document)
                            modal.create()
                            modal.accept((event: Event) => {})
                            modal.cancel()
                            form_request_friend.hidden = false
                            this.loading_friends(false)
                        })
                }
            })
        }
    }

    loading_friends(show: boolean) {
        const loading = this.getDocument().getElementById('loading-friends')
        const spinner = '<i class="fa-duotone fa-spinner fa-spin-pulse fa-spinner-duma"></i>'
        if (loading) {
            loading.innerHTML = (show) ? spinner : ''
        }
    }
}
