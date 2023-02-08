import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const fetchAll = () => {
  const countries = axios.get(baseUrl + '/all')
  return countries.then(response => response.data)
}

const countryService = { fetchAll }

export default countryService