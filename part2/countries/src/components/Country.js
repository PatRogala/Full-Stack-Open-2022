import weatherService from "../services/weather";
import Weather from "./Weather";

import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    weatherService.getWeather(country.capital[0]).then((weather) => {
      setWeather(weather);
    });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="200"
      />

      <Weather weather={weather} />
    </div>
  );
}

export default Country