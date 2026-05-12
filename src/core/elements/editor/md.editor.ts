import {SymbolButtonEnum, SymbolMdEnum} from './enums/symbol.md.enum'
import {TypeEvent} from '../../enums/events/type.event'

export class MDEditor {
    private readonly editor : HTMLTextAreaElement | undefined
    private selection_start: number = 0
    private selection_end: number = 0
    private id_editor = 'md-editor'

    constructor() {
        this.editor = document.getElementById(this.id_editor) as HTMLTextAreaElement
        this.prepare_buttons()
        this.prepare_tab()
    }
    private prepare_buttons() {
        this.assing_bold()
        this.assing_italic()
        this.assign_code()
        this.assing_title()
        this.assign_quote()
        this.assign_li()
        this.assign_ol()
        this.assign_check()
        this.resalt_author()
        this.resalt_quote()
    }

    private resalt_quote() {
        const button = document.getElementById(SymbolButtonEnum.RESALT_QUOTE)

        if (button) {
            button.addEventListener(TypeEvent.CLICK, (event: Event) => {
                event.preventDefault()
                if (this.editor) {
                    if (this.editor) {
                        const new_text = SymbolMdEnum.RESALT_QUOTE_START + this.get_selected_text() + SymbolMdEnum.END_SPAN
                        const substring_start = this.editor.value.substring(0, this.editor.selectionStart)
                        const substring_end = this.editor.value.substring(this.editor.selectionEnd, this.editor.value.length)
                        this.editor.value = `${substring_start}${new_text}${substring_end}`
                    }
                    this.adjust_cursor_position(1)
                    this.focus_in_editor()
                }
            })
        }
    }

    private resalt_author() {
        const button = document.getElementById(SymbolButtonEnum.RESALT_AUTHOR)

        if (button) {
            button.addEventListener(TypeEvent.CLICK, (event: Event) => {
                event.preventDefault()
                if (this.editor) {
                    if (this.editor) {
                        const new_text = SymbolMdEnum.RESALT_AUTHOR_START + this.get_selected_text() + SymbolMdEnum.END_SPAN
                        const substring_start = this.editor.value.substring(0, this.editor.selectionStart)
                        const substring_end = this.editor.value.substring(this.editor.selectionEnd, this.editor.value.length)
                        this.editor.value = `${substring_start}${new_text}${substring_end}`
                    }
                    this.adjust_cursor_position(1)
                    this.focus_in_editor()
                }
            })
        }
    }



    private prepare_tab() {
        const editor = this.editor
        if (editor) {
            editor.addEventListener(TypeEvent.KEYDOWN, (event: KeyboardEvent) => {
                if (event.key === 'Tab') {
                    event.preventDefault()
                    const cursor_position = editor.selectionStart
                    const text_before_cursor = editor.value.slice(0, cursor_position)
                    const text_after_cursor = editor.value.slice(cursor_position)
                    editor.value = text_before_cursor + '    ' + text_after_cursor
                    editor.selectionStart = editor.selectionEnd = cursor_position + 4
                }
            })
        }
    }

    private get_selected_text(): string {
        if (this.editor) {
            this.selection_start = this.editor.selectionStart
            this.selection_end = this.editor.selectionEnd
            return this.editor.value.substring(
                this.selection_start,
                this.selection_end
            )
        }
        return ''
    }

    private assign_code() {
        this.set_symbol_resalt_text(SymbolMdEnum.CODE, SymbolButtonEnum.CODE)
    }

    private assing_bold() {
        this.set_symbol_resalt_text(SymbolMdEnum.BOLD, SymbolButtonEnum.BOLD)
    }

    private assing_italic() {
        this.set_symbol_resalt_text(SymbolMdEnum.ITALIC, SymbolButtonEnum.ITALIC)
    }

    private assing_title() {
        this.set_symbol_start_line(SymbolMdEnum.H1, SymbolButtonEnum.H)
    }

    private assign_quote() {
        this.set_symbol_start_line(SymbolMdEnum.QUOTE, SymbolButtonEnum.QUOTE)
    }

    private assign_li() {
        this.set_symbol_start_line(SymbolMdEnum.LI, SymbolButtonEnum.LI)
    }

    private assign_ol() {
        this.set_symbol_start_line(SymbolMdEnum.OL, SymbolButtonEnum.OL)
    }

    private assign_check() {
        this.set_symbol_start_line(SymbolMdEnum.LI_CHECKED, SymbolButtonEnum.LI_CHECKED)
    }

    private set_symbol_resalt_text(symbol: string, id: string) {
        const button = document.getElementById(id)

        if (button) {
            button.addEventListener(TypeEvent.CLICK, (event: Event) => {
                event.preventDefault()
                if (this.editor) {
                    this.change_text(this.get_selected_text(), symbol)
                    this.adjust_cursor_position(1)
                    this.focus_in_editor()
                }
            })
        }
    }

    private set_symbol_start_line(symbol: string, id: string) {
        const button = document.getElementById(id)

        if (button) {
            button.addEventListener(TypeEvent.CLICK, (event: Event) => {
                event.preventDefault()
                if (this.editor) {
                    this.selection_end = this.editor.selectionEnd
                    this.selection_start = this.get_start_of_line_index()
                    const text_selected = this.editor.value.substring(this.selection_start, this.selection_end)
                    const substring_start = this.editor.value.substring(0, this.selection_start)
                    const substring_end = this.editor.value.substring(this.selection_end)
                    this.editor.value = `${substring_start}${symbol}${text_selected}${substring_end}`

                    this.adjust_cursor_position(1)
                    this.focus_in_editor()
                }
            })
        }
    }

    private get_start_of_line_index(): number {
        if (this.editor) {
            return this.editor.value.lastIndexOf('\n', this.editor.selectionStart - 1) + 1
        }

        return 0
    }

    private change_text(text: string, symbol: string) {
        if (this.editor) {
            const new_text = symbol + text + symbol
            const substring_start = this.editor.value.substring(0, this.editor.selectionStart)
            const substring_end = this.editor.value.substring(this.editor.selectionEnd, this.editor.value.length)
            this.editor.value = `${substring_start}${new_text}${substring_end}`
        }
    }

    private focus_in_editor() {
        if (this.editor) {
            this.editor.focus()
        }
    }

    private adjust_cursor_position(advance: number) {
        if (this.editor) {
            this.editor.setSelectionRange(this.selection_start + advance, this.selection_start + advance)
        }
    }
}



