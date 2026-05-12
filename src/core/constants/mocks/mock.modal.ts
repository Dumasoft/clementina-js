export const SIMPLE_MODAL = `
<div class="modal">
    <div class="modal--general modal--normal" id="{{ id_modal }}">
        <div class="modal--header">
            <div class="modal--title">
                <h1>{{ title_modal }}</h1>
            </div>
            <div class="modal--close">
                <a href="#">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </div>
        </div>
        <div class="modal--content">
            <p>{{ message_modal }}</p>
        </div>
        {{ footer_modal }}
    </div>
</div>
`

export const NOTE_MODAL = `
<div class="modal">
    <div class="modal--general modal--big" id="{{ id_modal }}">
        <div class="modal--header">
            <div class="modal--title">
                <h1>{{ title_modal }}</h1>
            </div>

            <div class="modal--options">
                <span id="option-download">
                    <i class="fa-duotone fa-solid fa-download"></i>
                </span>

                <span id="option-general">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </span>

                <span id="close">
                    <i class="fa-solid fa-xmark"></i>
                </span>

                <div class="context-menu" id="general-options-modal" style="display: none">
                    <button class="menu-item">
                        <i class="fa-regular fa-copy"></i>
                        <span class="menu-label">Duplicar</span>
                    </button>

                    <button class="menu-item">
                        <i class="fa-duotone fa-solid fa-box-archive"></i>
                        <span class="menu-label">Archivar</span>
                    </button>

                    <button class="menu-item danger" id="delete-note">
                        <i class="fa-duotone fa-solid fa-trash"></i>
                        <span class="menu-label">Eliminar</span>
                    </button>
                </div>

                <div class="context-menu" id="download-options-modal" style="display: none">
                    <button class="menu-item" id="download-pdf">
                        <i class="fa-duotone fa-solid fa-file-pdf"></i>
                        <span class="menu-label">Descargar pdf</span>
                    </button>

                    <button class="menu-item" id="download-doc">
                        <i class="fa-duotone fa-solid fa-file-doc"></i>
                        <span class="menu-label">Descargar docx</span>
                    </button>

                    <button class="menu-item" id="download-md">
                        <i class="fa-duotone fa-solid fa-file-lines"></i>
                        <span class="menu-label">Descargar markdown</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="modal--content">
            <input type="hidden" name="id">
            <input type="hidden" name="parent">
            <div class="book-field">
                <label class="required" for="id_title">Título:</label>
                <input type="text" name="title" id="id_title">
                <span></span>
            </div>

            <div class="book-field">
                <label class="required" for="id_order">Orden:</label>
                <input type="number" name="order" id="id_order">
                <span></span>
            </div>

            <div class="book-field">
                <label for="md-editor">Título:</label>

                <div class="panel">
                    <ul class="nav-tabs">
                        <li class="active" data-id="editor">Editor</li>
                        <li data-id="preview-editor" data-url="http://localhost:8080/editor/api/v1/md_to_html">Previsualización</li>
                    </ul>
                    <div class="panel--body">
                        <div class="tab-pane active" id="editor">
                            <div class="editormd">
                                <div class="editormd--header">
                                    <ul>
                                        <li><a href="#" id="md-h"><i class="fa-solid fa-h"></i></a></li>
                                        <li><a href="#" id="md-bold"><i class="fa-solid fa-bold"></i></a></li>
                                        <li><a href="#" id="md-italic"><i class="fa-solid fa-italic"></i></a></li>
                                        <li><a href="#" id="md-quote"><i class="fa-solid fa-block-quote"></i></a></li>
                                        <li><a href="#" id="md-code"><i class="fa-solid fa-code"></i></a></li>
                                        <li><a href="#" id="md-li"><i class="fa-solid fa-list"></i></a></li>
                                        <li><a href="#" id="md-ol"><i class="fa-sharp fa-solid fa-list-ol"></i></a></li>
                                        <li><a href="#" id="md-list-check"><i class="fa-sharp fa-solid fa-list-check"></i></a></li>
                                        <li><a href="#" id="md-resalt-author"><i class="fa-solid fa-at"></i></a></li>
                                        <li><a href="#" id="md-resalt-quote"><i class="fa-duotone fa-quote-left"></i></a></li>
                                    </ul>
                                </div>
                                <div class="editormd--content">
                                    <label for="md-editor"></label>
                                    <textarea name="text" id="md-editor"></textarea>
                                </div>
                                <div class="editormd--footer"></div>
                            </div>
                        </div>
                        <div class="tab-pane" id="preview-editor">
                            <div class="editormd--preview text-justify" id="md-preview"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{ footer_modal }}
    </div>
</div>
`

export const SIMPLE_MODAL_FOOTER = `
<div class="modal--footer">
    <div class="modal--buttons">
        <button class="btn btn--secondary" id="modal-acept">Aceptar</button>
        <button class="btn btn--danger" id="modal-cancel">Cancelar</button>
    </div>
</div>
`

export const NOTE_MODAL_FOOTER = `
<div class="modal--footer">
    <div class="modal--buttons">
        <button class="btn btn--book btn--primary" id="modal-acept">Guardar</button>
        <button class="btn btn--book btn--danger" id="modal-cancel">Cancelar</button>
    </div>
</div>
`
