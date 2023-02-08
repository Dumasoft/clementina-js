export class ConfigureAdmin {
    constructor() {
        this.change_icons()
        this.check_input_time()
        this.load_image()
    }

    change_icons() {
        const elements = document.querySelectorAll('.related-widget-wrapper-link')

        for (const element of elements) {
            const div = element as HTMLElement
            const image = div.querySelector('img')

            div.removeChild(image!)

            const i = document.createElement('i')
            i.classList.add('fad')

            if (div.classList.contains('change-related')) {
                i.classList.add('fa-pen-square')
            }

            if (div.classList.contains('add-related')) {
                i.classList.add('fa-plus-circle')
            }

            div.appendChild(i)
        }
    }

    check_input_time() {
        const field_box = document.querySelectorAll('form .fieldBox');

        for (const element of field_box) {
            const div = element as HTMLElement

            if (div.querySelector('.flatpickr')) {
                const container = document.createElement('div')
                container.classList.add('flatpickr--container')
                div.appendChild(container)

                const items_date = div.querySelectorAll('.flatpickr')

                for (const item of items_date) {
                    container.appendChild(item)
                }
            }
        }
    }

    load_image() {
        const input = document.querySelector('input[type=file]')

        if (input) {
            const id = input.getAttribute('data-id')

            input.addEventListener('change', () => {
                console.log('change')

                const reader = new FileReader()

                reader.addEventListener('load', () => {
                    if (id) {
                        const image = document.getElementById(id)

                        if (image) {
                            // @ts-ignore
                            image.src = reader.result
                        }
                    }
                    console.log(reader.result)

                })

                // @ts-ignore
                reader.readAsDataURL(input.files[0])
            })
        }
    }
}
