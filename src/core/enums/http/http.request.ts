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

            if (!response.ok) {
                throw new Error('Error en la petición')
            }

            if (response.status === 204) {
                return null
            }

            return await response.json()
        }

        return null
    }
    
    prepare_content(data: FormData | Record<string, any> | null = null): any {
        let body: FormData | null = null

        if (data instanceof FormData) {
            body = data
        } else if (data) {
            body = this.toFormData(data)
        }

        if (body) {
            body.append('csrfmiddlewaretoken', get_csrf())
        }

        const baseConfig: RequestInit = {
            method: this.method,
            headers: get_headers_csrf(),
        }

        if (this.method !== MethodsHttp.GET && this.method !== MethodsHttp.DELETE) {
            baseConfig.body = body
        }

        this.content_request = baseConfig
    }

    private toFormData(data: Record<string, any>): FormData {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value instanceof Blob ? value : String(value))
            }
        })

        return formData
    }
}
