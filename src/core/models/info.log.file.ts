import {LogFile} from './log.file'

export interface InfoLogFile {
    filename: string
    original_file_name: string
    next_page: number
    log_files: [LogFile]
    last: boolean
}
