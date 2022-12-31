import Country from "./Country";

const Countries = ({countries, setFilter}) => {
    const showCountry = (country) => {
        setFilter(country.name.common)
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }
    return (
        <div>
            {countries.map(country =>
                <p key={country.cca3}>{country.name.common}
                    <button onClick={() => showCountry(country)}>show</button>
                </p>)}
        </div>
    )
}

export default Countries