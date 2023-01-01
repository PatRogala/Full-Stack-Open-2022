import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
    return (
        <>
            {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
        </>
    )
}

export default Persons