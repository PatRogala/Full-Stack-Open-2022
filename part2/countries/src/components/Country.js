import axios from "axios";
import {useState, useEffect} from "react";

const Country = ({country}) => {
    const weather_api_key = process.env.REACT_APP_WEATHER_KEY
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${weather_api_key}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])



    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" width="100" />
            {weather.main && <div>
                <h2>Weather in {country.capital}</h2>
                <p><b>temperature:</b> {weather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                <p>wind {weather.wind.speed} m/s</p>
            </div>}
        </div>
    )
}

export default Country