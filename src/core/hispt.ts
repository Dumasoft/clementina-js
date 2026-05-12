import {Conversor} from "./elements/tools/conversor";
import {Slider} from "./components/slider";

export { Slider as default }

declare global {
    interface Window {
        Slider: typeof Slider
    }

    interface HTMLElementTagNameMap {
        'dumasoft-slider': Slider
    }
}


export class Hispt {
    constructor(name_app: string) {
        console.log(`%c Bienvenido a ${name_app}`, 'color: #990000; font-size: 15px; font-weight: bold;')
        this.load_general()
    }

    load_general() {
        new Conversor()

        console.log('------')
        if (!window.customElements.get('dumasoft-slider')) {
            console.log('slider')
            window.Slider = Slider
            window.customElements.define('dumasoft-slider', Slider)
        }
        console.log('------')
    }




}




