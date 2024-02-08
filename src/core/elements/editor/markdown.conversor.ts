import {get_headers_csrf} from "../../util/functions";

export class MarkdownConversor {
    constructor() { }

    preview(url: string) {
        const editor = document.getElementById('md-editor') as HTMLTextAreaElement
        const formdata = new FormData()
        const headers = get_headers_csrf()
        formdata.append('markdown_text', editor?.value || '')

        if (url) {
            fetch(url, {method: 'POST', body: formdata, headers: headers})
                .then((response: Response) => response.json())
                .then((data: any) => {
                    const div_preview = document.getElementById('md-preview')
                    if (div_preview) {
                        div_preview.innerHTML = data.html
                    }
                })
                .catch((error: any) => {
                    console.error(error)
                })
        }
    }
}
