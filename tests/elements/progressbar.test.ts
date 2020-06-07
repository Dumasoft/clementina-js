import 'mocha';
import { expect } from 'chai';
import { ProgressBar } from "../../core/elements/progress/ProgressBar";
import { CustomProgressBar } from "../../core/enums/html/custom/CustomProgressBar";

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Progress Bar', () => {
    beforeEach(() => {
        const dom = new JSDOM().window;
        const document = dom.document;
        const div = dom.document.createElement('div');
        this.progressbar = new ProgressBar({}, document);
        this.progressbar.create(div);
    });

    it('Creado', () => {
        expect(this.progressbar).not.to.be.undefined;
        expect(this.progressbar).not.to.be.null;
    });

    it('Elemento', () => {
        const bar: HTMLDivElement = this.progressbar.get();
        expect(bar.getAttribute('id')).to.equal(CustomProgressBar.BARRA_PROGRESO);
        expect(bar.classList.contains(CustomProgressBar.BARRA_PROGRESO)).to.equal(true);
    });

    it('Tiene hijos', () => {
        const bar: HTMLDivElement = this.progressbar.get();
        expect(bar.children.length).to.be.greaterThan(0);
    });
});