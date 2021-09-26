import { InfoLogFile } from '../../models/InfoLogFile'
import { BODY_TABLE, LI_FILTER_LOG_FILE } from '../../constants/mocks/MockLog'
import { ListLog } from '../../models/ListLog'
import { Log } from '../../models/Log'
import { existsClass } from '../../util/functions'
import { Paginator } from '../paginator/Paginator'
import { Color } from '../color/Color'

export class LogViewer {
    private readonly base_url: string

    private filter_files = 'log-files-list'
    private filter_level = 'filters_log'
    private body_logs = 'body-logs'
    private logs?: [Log] | undefined

    private total_pages?: number
    private total_per_page?: number

    private filter_level_select = ''

    private paginator: Paginator
    private color: Color

    constructor() {
        this.base_url = window.location.origin
        this.loadFiles()
        this.prepareFilterLevel()
        this.prepareEventsFile()

        this.paginator = new Paginator()
        this.color = new Color()
    }

    loadFiles() {
        if (document.getElementById(this.filter_files)) {
            const url_files_logs = `${this.base_url}/logs/json/`
            fetch(url_files_logs)
                .then((response: Response) => response.json())
                .then((data: InfoLogFile) => {
                    for (let log_file of data.log_files) {
                        const li = document.createElement('li')
                        li.innerHTML = LI_FILTER_LOG_FILE
                            .replace('--file_name--', log_file.name_file)
                            .replace('--file_name--', log_file.name_file)
                            .replace('--file_url--',  `${url_files_logs}${log_file.name_file}`)
                        document.getElementById(this.filter_files)?.appendChild(li)
                        this.createEventLoadLogs(li.querySelector('a')!)
                    }
                })
        }
    }

    createEventLoadLogs(link: HTMLElement) {
        link.addEventListener('click', (event: any) => {
            const name_file = event.target!.getAttribute('data-file-name')
            const url = `${this.base_url}/logs/json/${name_file}`
            this.displayLoading(true)
            event.target!.innerHTML = `${name_file} <i class="fad fa-dot-circle"></i>`
            this.showContentLogTable(url, name_file)
        })
    }

    showContentLogTable(url: string, name_file: string) {
        fetch(url)
            .then((response: Response) => response.json())
            .then((data: ListLog) => {
                this.logs = data.logs
                this.displayLoading(false)
                this.setTotalPages(this.logs)
                this.createRowTable(1, this.total_per_page || 10)
                document.getElementById(this.filter_level)!.hidden = false

                if (existsClass('#download-buttons', document)) {
                    document.getElementById('download-buttons')!.hidden = false
                }

                if (existsClass('#multiple-files', document)) {
                    const save_file: HTMLElement = document.getElementById('multiple-files')!
                    save_file!.setAttribute(
                        'href',
                        `${this.base_url}/logs/download/single-file/`
                    )
                }

                if (existsClass('#single-file', document)) {
                    const save_file: HTMLElement = document.getElementById('single-file')!
                    save_file!.setAttribute(
                        'href',
                        `${this.base_url}/logs/download/single-file/${name_file}`
                    )
                }

                if (existsClass('#delete-file', document)) {
                    const delete_file = document.getElementById('delete-file')!
                    delete_file.setAttribute('data-file-name', name_file)
                }
            })
            .catch((error: any) => console.error(error))
    }

    getLogs(): [Log] {
        return this.logs!
    }

    createRowTable(current_page: number, per_page_items: number) {
        const page = current_page || 1
        const per_page = per_page_items || 10
        const offset = (page - 1) * per_page

        const tbody = document.getElementById(this.body_logs)
        tbody!.innerHTML = ''

        let logs = this.logs
        if (this.filter_level_select !== '') {
            // @ts-ignore
            logs = this.logs!.filter((log: Log) => log.level === this.filter_level_select.toUpperCase())
        }

        const items = logs!.slice(offset).slice(0, per_page)

        for (let i = 0; i < items.length; i++) {
            const tr = document.createElement('tr')
            tr.innerHTML = BODY_TABLE
                .replace('--number--', `${(i + 1) + per_page * (page - 1)}`)
                .replace('--level--', items[i].level)
                .replace('--date--', items[i].date)
                .replace('--message--', items[i].message)
                .replace('--color--', this.color.getLevel(items[i].level))
            tbody!.appendChild(tr)
        }
        this.setTotalPages(logs!)
        this.displayPagination(current_page, logs!)
    }

    setTotalPages(logs: [Log]) {
        const element = document.getElementById('changelist-filter')
        this.total_per_page = parseInt(element!.getAttribute('data-items-per-page')!, 10)
        this.paginator.set_total_pages(Math.ceil(logs!.length / this.total_per_page))
        this.total_pages = Math.ceil(logs!.length / this.total_per_page)
    }

    displayLoading(show: boolean) {
        const area_loading = document.getElementById('area-loading')

        if (area_loading) {
            area_loading.innerHTML = (show) ? "<div class='loading'></div>" : ''
        }
    }

    displayPagination(current_page: number, logs: [Log]) {
        this.paginator.display(current_page, logs!.length)

        this.paginator.createEvents((event: any) => {
            const attribute = event.target!.getAttribute('data-number-page')
            const page = parseInt(attribute, 10)
            this.createRowTable(page, this.total_per_page || 10)
        })
    }

    prepareFilterLevel() {
        const levels = document.querySelectorAll('.filters-log span')
        levels.forEach((level: Element) => {
            level.addEventListener('click', (event: any) => {
                this.removeDots()
                const i = document.createElement('i')
                i.classList.add('fad')
                i.classList.add('fa-dot-circle')
                event.target.parentNode.appendChild(i)
                this.filter_level_select = event.target.getAttribute('data-level')
                this.createRowTable(1, this.total_per_page || 10)
            })
        })
    }

    removeDots() {
        const levels = document.querySelectorAll('.filters-log p')
        levels.forEach((level: Element) => {
            if (level.querySelector('i')) {
                const dot = level.querySelector('i')
                dot!.parentNode!.removeChild(dot!)
            }
        })
    }

    prepareEventsFile() {
        const save_file = document.getElementById('save-file')
        if (existsClass('#save-file', document)) {
            save_file!.addEventListener('click', (event: any) => {

            })
        }

        const delete_file = document.getElementById('delete-file')
        if (existsClass('#delete-file', document)) {
            delete_file!.addEventListener('click', (event: any) => {
                const name_file = delete_file!.getAttribute('data-file-name')
                const url = `${this.base_url}/logs/delete/${name_file}`
                fetch(url)
                    .then((response: Response) => response.json())
                    .then((data: any) => {
                        if (data.delete) {
                            if (name_file) {
                                this.showContentLogTable(`${this.base_url}/logs/json/${name_file}`, name_file!)
                            }
                        }
                    })
                    .catch((error: any) => console.error('No se ha podido resetear el archivo', error))
            })
        }
    }
}



