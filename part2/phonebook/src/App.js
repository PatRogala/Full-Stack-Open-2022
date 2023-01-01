import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'
import './css/index.css'
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })}, [])

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
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(p => p.name === newName)
                const changedPerson = {...person, number: newNumber}

                personService
                    .update(person.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setSuccessMessage(
                            `Updated ${returnedPerson.name}`
                        )
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 3000)
                    })
                    .catch(() => {
                        setPersons(persons.filter(p => p.id !== person.id))
                        setErrorMessage(
                            `Information of ${newName} has already been removed from server`
                        )

                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 3000)
                    })
            }
            return
        }

        personService
            .create(nameObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setSuccessMessage(
                    `Added ${returnedPerson.name}`
                )
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)
            })
    }

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deletePerson(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    setSuccessMessage(
                        `Deleted ${person.name}`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 3000)
                })
                .catch(() => {
                setPersons(persons.filter(p => p.id !== person.id))
                setErrorMessage(
                    `Information of ${person.name} has already been removed from server`
                )

                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={successMessage} type="success" />
            <Notification message={errorMessage} type="error" />
            <Filter filter={filter} setFilterChange={setFilterChange} />

            <h3>add a new</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Persons persons={filteredPersons} deletePerson={deletePerson} />
        </div>
    )
}

export default App