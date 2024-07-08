const express = require('express')
const router = express.Router()
const people = require('../controllers')
const { getPerson, createPerson, createPersonPostman, updatePerson, deletePerson } = require('../controllers/people')


// router.get('/', getPerson)

// router.post('/', createPerson )

// router.post('/postman', createPersonPostman)

// router.put('/:id', updatePerson)

// router.delete('/:id', deletePerson)

router.route('/').get(getPerson).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router