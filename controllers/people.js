let people = require('../data')

const getPerson = (req, res) => {
    res.status(200).json({ success: true, data: people })
}

const createPerson = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msq: 'please provide a name' })
    }
    res.status(200).json({ success: true, person: name })
}

const createPersonPostman = (req, res) => {

    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'please provide a name' })
    }
    res.statusres.status(400).json({ success: true, data: [...people, name] })
}

const updatePerson = (req, res) => {
    const name = req.body
    const id = req.param

    const person = people.find((person) => person.id === Number(id))

    if (!person) {
        return res.status(404).json({ success: false, msg: `There is person with id: ${req.params.id}` })
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPeople })
}

const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))

    if (!person) {
        return res.status(404).json({ success: false, msg: `There is person with id: ${req.params.id}` })
    }

    const newPeople = person.filter((person) => person.id !== Number(req.param.id));
    return res.status(200).json({ success: true, data: newPeople })
}

module.exports = {
    getPerson,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}