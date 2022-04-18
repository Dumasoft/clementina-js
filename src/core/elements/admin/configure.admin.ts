export class ConfigureAdmin {
    constructor() {
        this.change_icons()
        this.check_input_time()
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
        console.log(field_box)
    }
}
