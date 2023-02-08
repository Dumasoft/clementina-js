import { existsClass } from '../../util/functions'

export class Paginator {
    private total_pages = 0

    set_total_pages(total_pages: number) {
        this.total_pages = total_pages
    }

    display(current_page: number, total_elements: number) {

        let list_pagination = ''

        if (current_page > 3) {
            list_pagination += `<a href="javascript:;" data-number-page="1">1</a>`
        }

        if (current_page === 1) {
            list_pagination += `<span class="this-page">${current_page}</span>`
        }

        if (current_page === 2) {
            list_pagination += `<a href="javascript:;" data-number-page="1">1</a>`

            if (this.total_pages !== 2) {
                list_pagination += `<span class="this-page">${current_page}</span>`
            }
        }

        if (current_page === 3) {
            list_pagination += `<a href="javascript:;" data-number-page="1">1</a>`
            list_pagination += `<a href="javascript:;" data-number-page="2"">2</a>`

            if (this.total_pages !== 3) {
                list_pagination += `<span class="this-page">${current_page}</span>`
            }
        }

        if (current_page > 3) {
            let last = current_page -2
            list_pagination += ` ... <a href="javascript:;" data-number-page="${last}">${last}</a>`
            list_pagination += `<a href="javascript:;" data-number-page="${last + 1}">${last + 1}</a>`

            if (current_page < this.total_pages!) {
                list_pagination += `<span class="this-page">${current_page}</span>`
            }
        }

        if (current_page < this.total_pages! -2) {
            let next = current_page + 1
            list_pagination += `<a href="javascript:;" data-number-page="${next}">${next}</a>`
            list_pagination += `<a href="javascript:;" data-number-page="${next + 1}">${next + 1}</a> ... `
        }

        if (current_page !== this.total_pages! -2) {
            if (this.total_pages! !== 1) {
                list_pagination += this.assignPage(this.total_pages!, current_page)
            }
        } else {
            let next = current_page + 1
            list_pagination += `<a href="javascript:;" data-number-page="${next}">${next}</a>`
            list_pagination += `<a href="javascript:;" data-number-page="${next + 1}">${next + 1}</a>`
        }

        list_pagination += ` ${total_elements} logs `

        list_pagination = (total_elements > 0) ? list_pagination : 'Sin resultados'

        if (document.getElementById('navigation-paginator')) {
            document.getElementById('navigation-paginator')!.innerHTML = list_pagination
        }
    }

    getLinkPage(page: number, previous: string, posterior: string) {
        return `
            ${previous}
            <a href="javascript:;" data-number-page="${page}">${page}</a>
            ${posterior}
        `
    }

    getCurrentPage(page: number) {
        return `<span class="this-page">${page}</span>`
    }

    assignPage(current_page: number, compare_page: number) {
        return (current_page === compare_page) ?
            `<span class="this-page">${current_page}</span>` :
            `<a href="javascript:;" data-number-page="${current_page}">${current_page}</a>`
    }

    createEvents(change_page: (event: any) => void) {
        const links = document.querySelectorAll('.paginator a')

        links.forEach((link: Element) => {
            link.addEventListener('click', change_page)
        })
    }
}
