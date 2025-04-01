import { useEffect, useState } from "react"
import { getCurrentWeather, getForecastWeather } from "./services/weatherService"
import { WeatherResponse } from "./models/Weather"
import { FormattedData } from "./models/ForecastWeather";
import { FaWind } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";

import WeatherModal from "./components/WeatherModal";
import ForecastDetails from "./components/ForecastDetails";
function App() {

  const [city, setCity] = useState<string>("Nova Iorque")
  const [noData, setNoData] = useState<string>("Digite o nome da cidade no campo acima!")
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(null)
  const [forecastWeather, setForecastWeather] = useState<FormattedData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {

    const fetchWeather = async() => {
      if(city.trim() !== "") {
        setLoading(true)
        setNoData("")
        try {
          const current_data = await getCurrentWeather(city)
          const forecast_data = await getForecastWeather(city)
          if(current_data && forecast_data) {
            setCurrentWeather(current_data)
            setForecastWeather(forecast_data)
          } else {
            setNoData("Erro ao obter previsões. Tente novamente!")
          }
        } catch(err) {
          setCurrentWeather(null)
          setForecastWeather(null)
        }
        setLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchWeather()
    }, 500)

    return () => clearTimeout(debounce)

  }, [city])

  return (
    <div className="main_div">

      <h1 className="title"> Weather </h1>

      <input
        type="text"
        placeholder="New York"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      
      {loading && <p style={{textAlign: "center"}}> Carregando... </p>}

      {currentWeather && forecastWeather ?
        (
          <>
            <div className="current_temp">

              <h2> {currentWeather.name} </h2>
              
              <h4 className="main_temp"> {currentWeather.main.temp}°C </h4>

              <div className="windsAndHumidity">
                <p> <IoWater color="aqua" /> {currentWeather.main.humidity}% </p>
                <p> <FaWind color="#ccc"/> {(currentWeather.wind.speed * 3.6).toFixed(1)} Km/h </p>
              </div>

              <button onClick={() => setIsModalOpen(true)} className="openModalButton"> Next Days </button>

              <WeatherModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                <ForecastDetails forecastWeather={forecastWeather} />

                {/*
                <div className="days">
                  {Object.keys(forecastWeather).map((date) => (
                    <div key={date} className="day">
                      <h3>{date}</h3>
                      {forecastWeather[date].map((entry, index) => (
                        <div key={index} className="day_infos">
                          <p>{entry.time} - {entry.temperature}°C</p>
                          <p> {entry.description} </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                */}
              </WeatherModal>
            </div>
          </>
        )
        :
        <p style={{textAlign: "center"}}> {noData} </p>
      }

    </div>
  )
}

export default App
