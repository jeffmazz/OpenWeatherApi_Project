export interface WeatherResponse {
    base: string;
    clouds: {
        all: number
    };
    cod: number;
    coord: {
        lon: number
        lat: number
    };
    dt: number;
    id: number;
    main: {
        temp: number
        feels_like: number
        humidity: number
        temp_min: number
        temp_max: number
        pressure: number
    };
    name: string;
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    };
    timezone?: string;
    visibility: number
    weather: {
        description: string
        icon: string
    }[];
    wind: {
        speed:number
    };
    rain?: {
        "1h": number
    };
    snow?: {
    "1h": number
    };
    
}