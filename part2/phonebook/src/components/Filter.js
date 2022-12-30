const Filter = ({ filter, setFilterChange }) => {
    return (
        <div>
            filter shown with <input onChange={setFilterChange} value={filter} />
        </div>
    )
}

export default Filter