const Person = ({ person, deletePerson }) => {
  return(
  <>
    <p>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </p>
  </>)
}

const Persons = ({ persons, filter, deletePerson }) => {
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
    </div>
  )
}

export default Persons