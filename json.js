const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({ name: 'john', id: 34 })
})

app.listen(5000, () => {
    console.log('Server listening to port 5000')
})