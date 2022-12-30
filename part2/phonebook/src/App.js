import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
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
            <form onSubmit={addName}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <div key={person.name}>{person.name}</div>)}
        </div>
    )
}

export default App