/**
 * Comprueba si existe un elemento
 * @param element
 * @param document
 * @returns {boolean}
 */
export function existsClass(element: string, document: Document): boolean {
    return !!((document.querySelector(element)));
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
