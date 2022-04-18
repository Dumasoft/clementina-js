export class ConfigureApi {
    private name_input_token = 'csrfmiddlewaretoken'

    prepare_header_token(element: HTMLElement): any {
        const headers = {'X-CSRFToken': ''}

        element.querySelectorAll('input').forEach((input: any) => {
            if (input.name === this.name_input_token) {
                headers['X-CSRFToken'] = input.value
            }
        })

        return headers
    }
}
