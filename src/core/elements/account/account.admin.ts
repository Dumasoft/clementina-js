import {GlobalElement} from "../global.element";
import {IOptionsMenu} from "../../interfaces/i.options.menu";

export class AccountAdmin extends GlobalElement {
    constructor(options: IOptionsMenu | null, document: Document) {
        super(options, document)

        this.load_events()
        this.move_button_upload_file()
        this.add_friend()
    }

    get_csrf() {
        const csrf_input: HTMLInputElement | null = document.querySelector('input[name="csrfmiddlewaretoken"]')
        return csrf_input ? csrf_input.value : ''
    }

    get_headers() {
        return {
            'X-CSRFToken': this.get_csrf(),
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    load_events() {
        const limit = document.getElementById('limits-profile')
        const url = limit ? limit.getAttribute('data-url') : ''

        fetch(url ? url : '', {
            method: 'GET',
            headers: this.get_headers()
        })
            .then((response: Response) => response.text())
            .then((data: any) => {
                if (limit) {
                    limit.innerHTML = data
                }
            })
            .catch((error: any) => console.log(error))
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
            form_request_friend.addEventListener('submit', event => {
                event.preventDefault();
                const id_user= document.getElementById('id_user') as HTMLInputElement
                const id_friend = document.getElementById('id_friend') as HTMLInputElement

                if (id_user && id_friend) {
                    const fd = new FormData()
                    fd.append('csrfmiddlewaretoken', this.get_csrf())
                    fd.append('user_id', id_user.value)
                    fd.append('friend_id', id_friend.value)

                    const request_options= {
                        method: 'POST',
                        headers: this.get_headers(),
                        body: fd
                    }
                    const url = 'http://localhost:8080/friends/api/v1/send/'

                    fetch(url, request_options)
                        .then((response: Response) => response.text())
                        .then((data: any) => {
                           console.log(data)
                        })
                        .catch((error: any) => console.log(error))
                }
            })
        }
    }
}
