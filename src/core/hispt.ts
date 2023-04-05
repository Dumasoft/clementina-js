import {Conversor} from "./elements/tools/conversor";

export class Hispt {
    constructor(name_app: string) {
        console.log(`%c Bienvenido a ${name_app}`, 'color: #990000; font-size: 15px; font-weight: bold;')
        this.load_general()
    }

    load_general() {
        new Conversor()
    }
}
