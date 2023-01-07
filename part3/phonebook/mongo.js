require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url).then(() => {
    console.log('connected to MongoDB')

    if (process.argv.length === 2) {
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
    }

    if (process.argv.length === 4) {
        const person = new Person({
            name: process.argv[2],
            number: process.argv[3]
        })

        person.save().then(() => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
        })
    }
}).catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})