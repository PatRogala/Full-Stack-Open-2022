const Person = ({ person, deletePerson }) => {
    const handleDestroy = () => {
        deletePerson(person)
    }

    return (
        <div>
            {person.name} {person.number} <button onClick={handleDestroy}>delete</button>
        </div>
    )
}

export default Person