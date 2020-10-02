import 'mocha';
import { expect } from 'chai';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import { UploadZone, MethodsHttp } from '../../core';

describe('Upload Zone', () => {
    beforeEach(() => {
        const dom = new JSDOM().window;
        const document = dom.document;
        const div = dom.document.createElement('div');
        this.uploadzone = new UploadZone({}, document);
        this.uploadzone.create(div);
    });

    it ('Creado', () => {
        expect(this.uploadzone).not.to.be.undefined;
        expect(this.uploadzone).not.to.be.null;
    });

    it('Elemento', () => {
        const form: HTMLFormElement = this.uploadzone.get();
        expect(form.getAttribute('method')).to.equal(MethodsHttp.POST);
    });

    it('Tiene hijos', () => {
        const form: HTMLFormElement = this.uploadzone.get();
        expect(form.children.length).to.be.greaterThan(0);
    });
});
