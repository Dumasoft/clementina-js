import 'mocha';
import { expect } from 'chai';
import { crop, existsClass, getTextArray, hasClass } from "../../core/util/functions";

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Funciones utiles', () => {
    beforeEach(() => {
        const dom = new JSDOM('<body></body>').window;
        this.document = dom.document;
    });

    it('Eliminar espacios principio y final', () => {
        expect(crop(' centrado ')).to.equal('centrado');
        expect(crop(' derecha')).to.equal('derecha');
        expect(crop('izquierda ')).to.equal('izquierda');
        expect(crop(' izquierda derecha ')).to.equal('izquierda derecha');
        expect(crop('hacia la izquierda ')).to.equal('hacia la izquierda');
        expect(crop(' hacia la derecha')).to.equal('hacia la derecha');
        expect(crop('            ')).to.equal('');
        expect(crop(' ')).to.equal('');
        expect(crop('')).to.equal('');
    });

    it('Array de palabras', () => {
        expect(getTextArray('')).to.eql(['']);
        expect(getTextArray('hola')).to.eql(['hola']);
        expect(getTextArray('hola adios')).to.eql(['hola', 'adios']);
        expect(getTextArray(' como esta usted ')).to.eql(['como', 'esta', 'usted']);
        expect(getTextArray('hacia la izquierda ')).to.eql(['hacia', 'la', 'izquierda']);
        expect(getTextArray(' hacia la derecha')).to.eql(['hacia', 'la', 'derecha']);
    });

    it('Existe class en el dom', () => {
        const name = 'class_div';
        const div = this.document.createElement('div');
        div.classList.add(name);
        this.document.body.appendChild(div);
        expect(existsClass('.' + name, this.document)).to.equal(true);
    });

    it('Tiene class div', () => {
        const nameClass = 'class_div';
        const div = this.document.createElement('div');
        div.classList.add(nameClass);
        expect(hasClass(div, nameClass)).to.equal(true);
    });

    it('Insertar class div', () => {

    });

    it('Eliminar class div', () => {

    });

    it('Insertar eliminar class div', () => {

    });
});
