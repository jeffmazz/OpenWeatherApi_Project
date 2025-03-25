import axios from "axios"
import { ForecastResponse, ForecastHour } from "../models/ForecastWeather"

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const getCurrentWeather = async(city: string) => {
    try {

        const response =  await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric"
            }
        })

        return response.data

    } catch(error) {
        console.error("Erro ao buscar clima: ", error)
        return null
    }
}

export interface FormattedData {
    [date:string] : {
        time: string
        temperature: number
        description: string
    }[]
}

const formattedData = (response:ForecastResponse): FormattedData => {
    
    let daysCount = 0

    return response.list.reduce((acc:FormattedData, item:ForecastHour) => {

        const date = new Date(item.dt * 1000).toLocaleDateString()
        const hour = new Date(item.dt * 1000).toLocaleTimeString()
        
        if(!acc[date]) {
            daysCount++
            if(daysCount > 3) return acc
            acc[date] = []
        }
        
        acc[date].push({
            time: hour,
            temperature: item.main.temp,
            description: item.weather[0].description
        })

        return acc
    }, {} as FormattedData)
}

export const getForecastWeather = async(city: string) => {
    try {

        const response =  await axios.get<ForecastResponse>(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric"
            }
        })

        return formattedData(response.data)

    } catch(error) {
        console.error("Erro ao fazer previsão do tempo: ", error)
        return null
    }
}