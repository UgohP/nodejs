const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    const name = req.body

    if (name) {
        return res.status(200).json({ success: true, meg: `Welcome ${name}` })
    }
    res.status(404).json({ success: false, msg: 'Please enter a name' })
})

module.exports = router