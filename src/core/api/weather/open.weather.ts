import {Coordinate} from '../../models/coordinate'

export class OpenWeather {
    private base_url = 'https://api.openweathermap.org/data/2.5/weather'
    private readonly api_key

    constructor(api_key: string) {
        this.api_key = api_key
    }

    async getPrevisionDayForCoordinate(coordinate: Coordinate): Promise<any> {
        const url = `${this.base_url}?lat=${coordinate.lat}&lon=${coordinate.lng}&appid=${this.api_key}`
        const response = await fetch(url)
        return await response.json()
    }
}
