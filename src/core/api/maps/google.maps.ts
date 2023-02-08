import {GlobalElement} from '../../elements/global.element'
import {MAP_DASHBOARD} from "../../constants/mocks/mock.map";
import {Coordinate} from "../../models/coordinate";
import {STYLE_MAP_LIGHT} from "../../constants/style.maps";

export class GoogleMaps extends GlobalElement {
    // @ts-ignore
    private map: google.maps.Map
    // @ts-ignore
    private workers: Array<google.maps.Marker> = []

    constructor(options: any, document: Document) {
        super(options, document)
    }

    create(element: HTMLElement, coordinate?: Coordinate) {
        const map = document.createElement('div')
        map.innerHTML = MAP_DASHBOARD

        element = (element) ? element : this.getDocument().body
        element.appendChild(map)

        if (coordinate) {
            this.load_map(coordinate)
            this.load_events()
        }
    }

    private load_map(coordinate: Coordinate) {
        const element_map = document.getElementById('map')

        if (element_map) {
            // @ts-ignore
            this.map = new google.maps.Map(element_map, {
                center: coordinate,
                zoom: 14,
                disableDefaultUI: true,
                styles: STYLE_MAP_LIGHT
            })
        }
    }

    load_events() {
        this.event_location_worker()
        this.event_projects()
        this.event_weather()
    }

    private event_location_worker() {
        const location_worker = document.getElementById('location-worker-map')
        if (location_worker) {
            location_worker.addEventListener('click', (event: Event) => {
                const map = this.map
                // @ts-ignore
                const marker = new google.maps.Marker({
                    position: {lat: 43.460734367026966, lng: -7.851889733036431},
                    map,
                    title: "Hello World!",
                })
                this.workers.push(marker)
            })
        }
    }

    // @ts-ignore
    private set_map_markers(markers: Array<google.maps.Marker>, map: google.maps.Map | null) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    private event_projects() {
        const projects = document.getElementById('projects-map')
        if (projects) {
            projects.addEventListener('click', (event: Event) => {
                console.log(this.workers)
                debugger
                this.set_map_markers(this.workers, null)

                this.workers = [];
            })
        }
    }

    private event_weather() {
        const weather = document.getElementById('weather-map')
        if (weather) {
            weather.addEventListener('click', (event: Event) => {
                console.log('worker', event)
            })
        }
    }
}
