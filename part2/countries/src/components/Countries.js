import Country from './Country'
import Button from './Button'

const Countries = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common} <Button country={country} handleClick={handleClick} />
          </li>
        ))}
      </ul>
    )
  }
}

export default Countries