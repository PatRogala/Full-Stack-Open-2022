import {useEffect, useState} from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const countriesToShow = filter === ''
        ? []
        : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            find countries <input onChange={handleFilterChange} />
            <Countries countries={countriesToShow} />
        </div>
    );
}

export default App;
