import Person from "./Person";

const Persons = ({ persons }) => {
    return (
        <>
            {persons.map(person => <Person key={person.name} person={person} />)}
        </>
    )
}

export default Persons