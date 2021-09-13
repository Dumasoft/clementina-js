import { LogFile } from './LogFile'
import { Log } from './Log'

export interface ListLog {
    current_file: string
    file: string
    file_name: string
    last: boolean
    log_files: [LogFile]
    logs: [Log]
    next_page: number
    original_file_name: string
}
