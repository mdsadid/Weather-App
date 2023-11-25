import {useState, useEffect} from "react";

import style from "./weather.module.css"
import search_icon from "../assets/search.png"
import cloud_icon from "../assets/cloud.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import clear_icon from "../assets/clear.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import fog_icon from "../assets/fog.png"

const Weather = () => {
  const [inputCity, setInputCity] = useState('Dhaka')
  const [weatherStatus, setWeatherStatus] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [location, setLocation] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(clear_icon)

  const apiKey = "ea0f22d9a2d4e6563f7ae37f7f911338"

  const getWeatherInformation = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`

    let response = await fetch(url)
    let data = await response.json()

    let icon = data.weather[0].icon

    if (icon === '01d' || icon === '01n') {
      setWeatherIcon(clear_icon)
    } else if (
      icon === '02d' ||
      icon === '02n' ||
      icon === '03d' ||
      icon === '03n' ||
      icon === '04d' ||
      icon === '04n'
    ) {
      setWeatherIcon(cloud_icon)
    } else if (icon === '09d' || icon === '09n') {
      setWeatherIcon(drizzle_icon)
    } else if (
      icon === '10d' ||
      icon === '10n' ||
      icon === '11d' ||
      icon === '11n'
    ) {
      setWeatherIcon(rain_icon)
    } else if (icon === '13d' || icon === '13n') {
      setWeatherIcon(snow_icon)
    } else if (icon === '50d' || icon === '50n') {
      setWeatherIcon(fog_icon)
    }

    setWeatherStatus(data.weather[0].main)
    setTemperature(Math.round(data.main.temp))
    setLocation(data.name)
    setHumidity(data.main.humidity)
    setWindSpeed(data.wind.speed)
    setInputCity('')
  }

  useEffect(() => {
    getWeatherInformation()
  }, [])

  const handleCityInput = (event) => {
    setInputCity(event.target.value)
  }

  const handleSearch = () => {
    if (inputCity === null) {
      return
    }

    getWeatherInformation()
  }

  return (
    <>
      <div className={style.container}>
        <div className={style['top-bar']}>
          <input type="text" className={style['city-input']} placeholder="Search..." onChange={handleCityInput} value={inputCity}/>
          <div className={style['search-icon']} onClick={handleSearch}>
            <img src={search_icon} alt="search icon"/>
          </div>
        </div>

        <div className={style["weather-image"]}>
          <img src={weatherIcon} alt="weather icon"/>
        </div>

        <div className={style["weather-temperature"]}>
          {weatherStatus}, {temperature}°c
        </div>

        <div className={style["weather-location"]}>
          {location}
        </div>

        <div className={style["data-container"]}>
          <div className={style.element}>
            <img src={humidity_icon} alt="humidity icon" className={style.icon}/>
            <div className={style.data}>
              <div className={style["humidity-percentage"]}>
                {humidity}%
              </div>
              <div className={style.text}>
                Humidity
              </div>
            </div>
          </div>

          <div className={style.element}>
            <img src={wind_icon} alt="wind icon" className={style.icon}/>
            <div className={style.data}>
              <div className={style["wind-speed"]}>
                {windSpeed} km/h
              </div>
              <div className={style.text}>
                Wind Speed
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Weather