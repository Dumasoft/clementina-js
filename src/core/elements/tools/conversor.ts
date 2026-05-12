export class Conversor {
    private input_number: HTMLInputElement | null | undefined
    private result: HTMLElement | null | undefined

    constructor() {
        this.prepareElements()
        this.createEvents()
    }

    prepareElements() {
        this.input_number = document.getElementById('number-conversor') as HTMLInputElement
        this.result = document.getElementById('result-number');
    }

    createEvents() {
        this.eventInputConversor()
        this.changeConversor()
    }

    eventInputConversor() {
        if (this.input_number) {
            this.input_number.addEventListener('keyup', (e) => {
                e.preventDefault()

                if (this.result) {
                    const element = e.target as HTMLInputElement

                    if (element.getAttribute('data-type') === 'arabic') {
                        element.value = element.value.replace(/[^0-9]/g, '')
                    }

                    if (element.getAttribute('data-type') === 'roman') {
                        element.value = element.value.replace(/[^IVXLCDMivxlcdm]/g, '').toUpperCase()
                    }

                    this.result.innerHTML = element.value
                }
            })
        }
    }

    changeConversor() {
        const radio_buttons: NodeListOf<Element> = document.querySelectorAll('input[name="conversor"]')

        if (radio_buttons) {
            for (const radio of radio_buttons) {
                radio.addEventListener('change', (e) => {
                    const element = e.target as HTMLInputElement

                    if (this.input_number) {
                        this.input_number.value = ''

                        if (this.result) {
                            this.result.innerHTML = ''
                        }

                        this.input_number.setAttribute('data-type', element.value)
                    }
                })
            }
        }
    }
}
