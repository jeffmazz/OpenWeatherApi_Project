import { useEffect, useState } from "react"
import { FormattedData, FormattedDataItem } from "../models/ForecastWeather"
import styles from "./ForecastDetails.module.css"

interface ForecastDetailsProps {
    forecastWeather: FormattedData
}

const weatherEmojis: { [key: string]: string } = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "⛅",
    "broken clouds": "🌥️",
    "overcast clouds": "☁️",
    "light rain": "🌦️",
    "moderate rain": "🌧️",
    "heavy intensity rain": "🌧️💦",
    "very heavy rain": "🌧️🌊",
    "extreme rain": "🌊🌧️",
    "freezing rain": "🥶🌧️",
    "thunderstorm with light rain": "⛈️🌦️",
    "thunderstorm with rain": "⛈️🌧️",
    "thunderstorm with heavy rain": "⛈️🌊",
    "light thunderstorm": "🌩️",
    "thunderstorm": "⛈️",
    "heavy thunderstorm": "🌩️⚡",
    "ragged thunderstorm": "🌩️🌪️",
    "light snow": "🌨️",
    "snow": "❄️",
    "heavy snow": "❄️❄️",
    "mist": "🌫️",
    "fog": "🌫️🌁",
    "haze": "🌁",
    "sand": "🏜️",
    "dust": "🌪️🏜️",
    "volcanic ash": "🌋🌫️",
    "squalls": "🌬️🌊",
    "tornado": "🌪️🌪️"
}

const ForecastDetails:React.FC<ForecastDetailsProps> = ({forecastWeather}) => {

    const [chosenData, setChosenData] = useState<string>('')
    const [chosenForecast, setChosenForecast] = useState<FormattedDataItem[] | null>(null)

    useEffect(() => {
        if(chosenData) {
            setChosenForecast(forecastWeather[chosenData] || null)
        }
    }, [chosenData, forecastWeather])

  return (
    <div>
        {forecastWeather &&
            <ul className={styles.list}>
                {Object.keys(forecastWeather).map((key) => (
                    <li key={key}>
                        <button onClick={() => setChosenData(key)}> {key} </button>
                    </li>
                ))}
            </ul>
        }
        {chosenData && chosenForecast &&
            <div className={styles.buttons}>
                <h3> {chosenData} </h3>
                <ul className={styles.forecasts}>
                    {chosenForecast.map((forecast, index) => (
                        <li key={index}>
                            <div>
                                <span> {forecast.time} </span>
                                <span title={forecast.description} className={styles.emoji}>{weatherEmojis[forecast.description] || "❓"}</span>
                                <span> {forecast.temperature}°C </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        }
    </div>
  )
}

export default ForecastDetails