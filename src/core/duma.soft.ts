import {Menu} from "./elements/menu/menu";
import {Layout} from "./elements/layout/layout";
import {LogViewer} from "./elements/logviewer/log.viewer";
import {Contact} from "./elements/contact/contact";
import {ApexChartWeb} from "./elements/charts/apex.chart.web";
import {GoogleMaps} from "./api/maps/google.maps";
import {Todo} from "./elements/todo/todo";
import {ConfigureAdmin} from "./elements/admin/configure.admin";

export class DumaSoft {
    constructor(name_app: string) {
        console.log(`%c Bienvenido a ${name_app}`, 'color: #F8485E; font-size: 15px; font-weight: bold;')
        this.load_general()
    }

    private load_general() {
        new Menu(null, document)
        new Layout({check_operation_system: false}, document)

        new LogViewer()

        new Contact()

        const chart_principal_dashboard: HTMLCanvasElement = document.getElementById(
            'principal-dashboard'
        ) as HTMLCanvasElement;



        const apex_chart = new ApexChartWeb()
        apex_chart.get_evolution()

        const map_dashboard = document.getElementById('map-dashboard')

        if (map_dashboard) {
            const coordinate = {lat: 43.4585201000042, lng: -7.851332557671506}
            const google_maps = new GoogleMaps(undefined, document)
            google_maps.create(map_dashboard, coordinate)
        }

        new Todo(undefined, document)
        new ConfigureAdmin()

        if (document.querySelector('.flatpickr-time-date')) {
            // @ts-ignore
            flatpickr('.flatpickr-time-date', {
                dateFormat: 'd/m/Y'
            });
        }

        if (document.querySelector('.flatpickr-time-hour')) {
            // @ts-ignore
            flatpickr('.flatpickr-time-hour', {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true
            });
        }
    }
}
