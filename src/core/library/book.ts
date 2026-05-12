import {GlobalElement} from "../elements/global.element";

export class Book extends GlobalElement {
    constructor(options: any, document: Document) {
        super(options, document);
        this.load_events()
    }

    load_events() {
        const button_edit = document.getElementById('edit-personal-book')
        let card_book_data = document.getElementById('book-data')
        const book_form = document.getElementById('book-form')
        let submit_form = document.getElementById('submit-form')
        const item_close_edit = document.getElementById('close-edit')

        if (button_edit && card_book_data && book_form && submit_form) {
            this.open_edit(button_edit, card_book_data, book_form,  submit_form)
        }

        if (item_close_edit && card_book_data && book_form && submit_form) {
            this.close_edit(item_close_edit, card_book_data, book_form, submit_form)
        }
    }

    open_edit(
        button_edit: HTMLElement,
        card_book_data: HTMLElement,
        book_form: HTMLElement,
        submit_form: HTMLElement
    ) {
        book_form.style.display = 'none'
        submit_form.style.display = 'none'

        button_edit.addEventListener('click', function (evt) {
            evt.preventDefault()

            card_book_data.style.display = 'none'
            book_form.style.display = 'block'
            submit_form.style.display = 'flex'
        });
    }

    close_edit(
        close_button_edit: HTMLElement,
        card_book_data: HTMLElement,
        book_form: HTMLElement,
        submit_form: HTMLElement
    ) {
        close_button_edit.addEventListener('click', function (evt) {
            evt.preventDefault()

            card_book_data.style.display = 'grid'
            book_form.style.display = 'none'
            submit_form.style.display = 'none'
        })
    }
}
