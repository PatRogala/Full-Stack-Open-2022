const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons, filter }) => {
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default Persons