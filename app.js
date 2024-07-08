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

app.use(express.json())

app.post('/login', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send("Please enter a name")
})

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
    const name = req.body
    if (!name) {
        res.status(400).json({ success: false, msg: 'Please provide a name' })
    }
    res.status(201).json({ success: true, person: name })
})
app.post('/api/people/postman', (req, res) => {
    const name = req.body
    if (!name) {
        res, status(400).json({ success: false, msq: "Please enter a name" })
    }
    res.status(200).json({ success: true, meq: [...people, name] })
})
app.listen(5000, () => {
    console.log('App is listening on port 5000')
})