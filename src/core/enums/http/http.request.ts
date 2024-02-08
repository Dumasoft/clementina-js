import {MethodsHttp} from './methods.http'
import {get_csrf, get_headers_csrf} from '../../util/functions'

export class HttpRequest {
    private readonly method: MethodsHttp
    private readonly url: string | null
    private content_request: any

    constructor(method: MethodsHttp, url: string | null) {
        this.method = method
        this.url = url
    }

    async call(): Promise<any> {
        if (this.url) {
            const response = await fetch(
                this.url,
                this.content_request,
            )

            if (response.status < 400 || response.status > 599) {
                return await response.json()
            } else {
                throw new Error('Error en la petición')
            }
        }

        return null
    }

    prepare_content(data: FormData | null = null): any {
        if (this.method === MethodsHttp.GET) {
            this.content_request = {
                method: this.method,
                headers: get_headers_csrf()
            }
        } else {
            if (data) {
                data.append('csrfmiddlewaretoken', get_csrf())
            }
            this.content_request = {
                method: this.method,
                headers: get_headers_csrf(),
                body: data
            }
        }
    }
}
