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
const people = require('./routes/people')
const auth = require('./routes/auth')


app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use('/api/people', people)
app.use('/api/login', auth)


app.listen(5000, () => {
    console.log('App is listening on port 5000')
})