import { useEffect, useState } from "react"
import { FormattedData, FormattedDataItem } from "../models/ForecastWeather"
import styles from "./ForecastDetails.module.css"

interface ForecastDetailsProps {
    forecastWeather: FormattedData
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
                        {forecast.time} - {forecast.description} - {forecast.temperature}°C
                        </li>
                    ))}
                </ul>
            </div>
        }
    </div>
  )
}

export default ForecastDetails