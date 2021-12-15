import {Coordinate} from '../../models/coordinate'

export class GoogleMaps {
    // @ts-ignore
    public map: google.maps.Map

    constructor(element: HTMLElement, coordinate: Coordinate) {
        // @ts-ignore
        this.map = new google.maps.Map(element, {
            center: coordinate,
            zoom: 8
        });
    }
}
