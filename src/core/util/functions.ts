/**
 * Comprueba si existe un elemento
 * @param element
 * @param document
 * @returns {boolean}
 */
export function existsClass(element: string, document: Document): boolean {
    return !!((document.querySelector(element)));
}

export function existsElementId(element: Element): boolean {
    return !!element
}

/**
 *
 * @param element
 * @param clase
 * @returns {boolean}
 */
export function hasClass(element: HTMLElement, clase: string): boolean {
    return (element.classList.contains(clase));
}

/**
 *
 * @param element
 * @param clases
 * @param document
 */
export function insertClass(element: string, clases: string, document: Document) {
    insertDeleteClass(element, clases, 'insertar', document);
}

/**
 *
 * @param element
 * @param clases
 * @param document
 */
export function deleteClass(element: string, clases: string, document: Document) {
    insertDeleteClass(element, clases, 'eliminar', document);
}

/**
 *
 * @param element
 * @param clases
 * @param action
 * @param documentCustom
 */
export function insertDeleteClass(element: string, clases: string, action: string, documentCustom: Document) {
    const arrayClass: Array<string> = clases.split(' ');

    arrayClass.forEach((clase: string) => {
        const elements: NodeListOf<HTMLElement> = documentCustom.querySelectorAll(element);

        elements.forEach(function (item: HTMLElement) {
            (action === 'insertar') ? item.classList.add(clase) : item.classList.remove(clase);
        });
    });
}

/**
 * Elimina espacios en blanco al principio y al final de una cadena.
 *
 * @param {string} text
 * @returns {string} cadena sin espacios en blanco
 */
export function crop(text: string): string {
    return text.trim ? text.trim(): text.replace(/^\s+|\s+$/g, '');
}

/**
 * Devuelve un array de palabras a partir de una cadena.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function getTextArray(text: string): Array<string> {
    return crop(text).split(/\s+/);
}

/**
 * Devuelve un uuid aleatorio
 */
export function get_uuid4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function show_hide_element(content: HTMLElement | null): boolean {
    if (content) {
        if (content.style.display === 'none') {
            content.style.display = 'block'
            return true
        } else {
            content.style.display = 'none'
        }
    }

    return false
}

export function getCookie(name: string): string | null {
    let cookieValue = null;
    console.log(document.cookie)
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        console.log(cookies)
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
}

export function get_csrf(): string {
    const csrf_input: HTMLInputElement | null = document.querySelector('input[name="csrfmiddlewaretoken"]')
    return csrf_input ? csrf_input.value : ''
}

export function get_headers_csrf() {
    return {
        'X-CSRFToken': get_csrf(),
        'X-Requested-With': 'XMLHttpRequest'
    }
}

export function get_host(): string {
    return `${window.location.protocol}//${window.location.host}`
}

export function get_full_url(url: string): string {
    return `${get_host()}${url}`
}
