import { useEffect, useState } from "react";
import countryService from "./services/country";
import SearchCountry from "./components/SearchCountry";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    countryService.fetchAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [search, countries]);


  return (
    <div>
      <SearchCountry
        search={search}
        handleSearchChange={(event) => setSearch(event.target.value)}
      />

      <Countries countries={searchResults} handleClick={setSearch} />
    </div>
  );
}

export default App;
