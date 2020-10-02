import 'mocha';
import { expect } from 'chai';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import {
    crop,
    deleteClass,
    existsClass,
    getTextArray,
    hasClass,
    insertClass,
    insertDeleteClass
} from '../../core';

describe('Funciones utiles', () => {
    before(() => {
        const dom = new JSDOM('<body></body>').window;
        this.document = dom.document;
        this.div = this.document.createElement('div');
        this.document.body.appendChild(this.div);
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
        this.div.classList.add(name);
        this.document.body.appendChild(this.div);
        expect(existsClass('.' + name, this.document)).to.equal(true);
    });

    it('Tiene class div', () => {
        const nameClass = 'class_div';
        this.div.classList.add(nameClass);
        expect(hasClass(this.div, nameClass)).to.equal(true);
    });

    it('Insertar class div', () => {
        const name = 'prueba-insertar';
        this.div.classList.add(name);

        insertClass('.' + name, 'clase1 clase2', this.document);

        expect(hasClass(this.div, name)).to.equal(true);
        expect(hasClass(this.div, 'clase1')).to.equal(true);
        expect(hasClass(this.div, 'clase2')).to.equal(true);
        expect(hasClass(this.div, 'clase3')).to.equal(false);
    });

    it('Eliminar class div', () => {
        const name = 'prueba-eliminar';
        this.div.classList.add(name);

        insertClass('.' + name, 'clase1 clase2', this.document);

        expect(hasClass(this.div, name)).to.equal(true);

        expect(hasClass(this.div, 'clase1')).to.equal(true);
        deleteClass('.' + name, 'clase1', this.document);
        expect(hasClass(this.div, 'clase1')).to.equal(false);

        expect(hasClass(this.div, 'clase2')).to.equal(true);
        deleteClass('.' + name, 'clase2', this.document);
        expect(hasClass(this.div, 'clase2')).to.equal(false);
    });

    it('Insertar eliminar class div', () => {
        const name = 'prueba-eliminar-insertar';
        this.div.classList.add(name);

        insertDeleteClass('.' + name, 'clase1 clase2', 'insertar', this.document);

        expect(hasClass(this.div, name)).to.equal(true);

        expect(hasClass(this.div, 'clase1')).to.equal(true);
        expect(hasClass(this.div, 'clase2')).to.equal(true);
        insertDeleteClass('.' + name, 'clase1 clase2', 'eliminar', this.document);
        expect(hasClass(this.div, 'clase1')).to.equal(false);
        expect(hasClass(this.div, 'clase2')).to.equal(false);
    });
});
