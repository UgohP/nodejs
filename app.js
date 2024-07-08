// // function sayHello(name) {
// //     console.log('Hello ' + name); //global
// // }

// // sayHello('Paschal');
// var logger = require('./logger');

// logger.log('message');

// const http = require('http')

// const server = http.createServer((res, req) => {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     res.write('<h1>home page</h1>')
//     res.end()
// })

// server.listen(5000)

const express = require('express')
const app = express()
let people = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})
app.post('/login', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send("Please enter a name")
})
app.listen(5000, () => {
    console.log('App is listening on port 2000')
})