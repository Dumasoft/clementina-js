export const SIMPLE_MODAL = `
<div class="modal">
    <div class="modal--general modal--normal" id="{{ id_modal }}">
        <div class="modal--header">
            <div class="modal--title">
                <h1>{{ title_modal }}</h1>
            </div>
            <div class="modal--close">
                <a href="#">
                    <i class="fa-duotone fa-square-xmark"></i>
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
export const SIMPLE_MODAL_FOOTER = `
<div class="modal--footer">
    <div class="modal--buttons">
        <button class="btn btn--secondary" id="modal-acept">Aceptar</button>
        <button class="btn btn--secondary" id="modal-cancel">Cancelar</button>
    </div>
</div>
`
