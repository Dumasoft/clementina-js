export const SIMPLE_MODAL = `
<div class="modal">
    <div class="modal--general modal--normal" id="{{ id_modal }}">
        <div class="modal--header">
            <div class="modal--title">
                <h1>{{ title_modal }}</h1>
            </div>
            <div class="modal--close">
                <a href="#">
                    <i class="fas fa-times-circle"></i>
                </a>
            </div>
        </div>
        <div class="modal--content">
            <p>hola</p>
        </div>
        <div class="modal--footer">
            <div class="modal--buttons">
                <button class="btn btn--secondary">Aceptar</button>
                <button class="btn btn--secondary">Cancelar</button>
            </div>
        </div>
    </div>
</div>
`