interface forecastDayWeatherItem {
    description: string
    icon: string
    id: number
    main: string
}

export interface ForecastHour {
    clouds: {
        all: number
    };
    dt: number;
    dt_txt: string;
    main: {
        feels_like: number
        grnd_level: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
        temp_kf: number
        temp_min: number
        temp_max: number
    };
    pop: number;
    sys: {
        pod: string
    };
    visibility: number;
    weather: forecastDayWeatherItem[];
    wind: {
        deg: number
        gust: number
        speed: number
    }
}

export interface ForecastResponse {
    city: {
        coord: {
            lat: number
            lon: number
        }
        country: string
        id: number
        name: string
        population: number
        sunrise?: number
        sunset?: number
        timezone?: number
    };
    cnt: number;
    cod: string;
    list: ForecastHour[]
    message?: number
}

export interface FormattedData {
    [date:string] : FormattedDataItem[]
}

export interface FormattedDataItem {
    time: string
    temperature: number
    description: string
  }