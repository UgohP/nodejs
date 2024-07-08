const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})
app.all('*', (req, res) => {
    res.statusCode(404).send('resourse not found')
})

app.listen(9000, () => {
    console.log('server is listening to port 9000')
})