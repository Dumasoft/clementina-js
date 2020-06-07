import {
    crop,
    getTextArray,
    existsClass,
    hasClass
} from "../../core/util/functions";


const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Funciones utiles', () => {
    beforeEach(() => {
        const dom = new JSDOM('<body></body>').window;
        this.document = dom.document;
    });

    it('Eliminar espacios principio y final', () => {
        expect(crop(' centrado ')).toEqual('centrado');
        expect(crop(' derecha')).toEqual('derecha');
        expect(crop('izquierda ')).toEqual('izquierda');
        expect(crop(' izquierda derecha ')).toEqual('izquierda derecha');
        expect(crop('hacia la izquierda ')).toEqual('hacia la izquierda');
        expect(crop(' hacia la derecha')).toEqual('hacia la derecha');
        expect(crop('            ')).toEqual('');
        expect(crop(' ')).toEqual('');
        expect(crop('')).toEqual('');
    });

    it('Array de palabras', () => {
        expect(getTextArray('')).toEqual(['']);
        expect(getTextArray('hola')).toEqual(['hola']);
        expect(getTextArray('hola adios')).toEqual(['hola', 'adios']);
        expect(getTextArray(' como esta usted ')).toEqual(['como', 'esta', 'usted']);
        expect(getTextArray('hacia la izquierda ')).toEqual(['hacia', 'la', 'izquierda']);
        expect(getTextArray(' hacia la derecha')).toEqual(['hacia', 'la', 'derecha']);
    });

    it('Existe class en el dom', () => {
        const name = 'class_div';
        const div = this.document.createElement('div');
        div.classList.add(name);
        this.document.body.appendChild(div);
        expect(existsClass('.' + name, this.document)).toEqual(true);
    });

    it('Tiene class div', () => {
        const nameClass = 'class_div';
        const div = this.document.createElement('div');
        div.classList.add(nameClass);
        expect(hasClass(div, nameClass)).toEqual(true);
    });

    it('Insertar class div', () => {

    });

    it('Eliminar class div', () => {

    });

    it('Insertar eliminar class div', () => {

    });
});
