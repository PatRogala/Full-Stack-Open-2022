const Weather = ({ weather }) => {
  if (Object.keys(weather).length === 0) {
    return <p>Fetching weather...</p>
  }

  console.log(weather)
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p><strong>temperature:</strong> {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
      <p><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather