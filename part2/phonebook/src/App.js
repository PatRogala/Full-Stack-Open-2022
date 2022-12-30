import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const setFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }

        if (persons.some(person => person.name === newName)) {
            return alert(`${newName} is already added to phonebook`)
        }

        setPersons(persons.concat(nameObject))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with <input onChange={setFilterChange} value={filter} />
            </div>
            <form onSubmit={addPerson}>
                <h2>add a new</h2>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={newNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}

export default App