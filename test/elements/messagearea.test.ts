import {MessageArea} from "../../src/core";
import {TypeSystemMessages} from "../../src/core/enums/events/type.system.messages";

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Message Area', () => {
    before(() => {
        const dom = new JSDOM().window;
        const document = dom.document;
        const div = document.createElement('div');
        this.messagearea = new MessageArea({}, document);
        this.messagearea.create(div, TypeSystemMessages.SUCCESS, 'Mensaje')
    });

    it('Creado', () => {
        expect(this.messagearea).not.to.be.undefined;
        expect(this.messagearea).not.to.be.null;
    })
})
