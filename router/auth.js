const express = require('express')
const { people } = require('../data')
const router = express.Router()

app.get('api/people', (req, res) => {
    res.status(200).json({success:true, data:people})
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({success:false, msq:'please provide a name'})
    }
    res.status(200).json({success:true, person:name})
})

app.post('/api/people/postman', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg:'please provide a name' })
    }
    res.statusres.status(400).json({ success: true, data: [...people, name] })
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const name = req.body
    const person = people.find((person) => person.id === Number(id))

    if (!person) {
        return res.status(404).json({success:false, msq:`Please, there is no person with the id: ${id}`})
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    return res.status(200).json({success:true, data: newPeople})
})