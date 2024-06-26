const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to my homepage')
    }
    if (req.url === '/about') {
        res.end('welcome to our about page')
    }
    res.end(
        `<h1>Opps the page is not avaliable <h1>
        <a href = '/'> babck to home page <a>`
    )
})
server.listen(5000)

