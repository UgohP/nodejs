// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.end('Welcome to my homepage')
//     }
//     if (req.url === '/about') {
//         res.end('welcome to our about page')
//     }
//     res.end(
//         `<h1>Opps the page is not avaliable <h1>
//         <a href = '/'> babck to home page <a>`
//     )
// })
// server.listen(5000)
// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.writeHead(200, { 'content-type': 'text/html' });
//         res.write('<h1>Home Page</h1>');
//         res.end();
//     }
//     if (req.url === '/about') {
//         res.end('This is the about page')
//     }
//     res.end('Error page')
// })

// server.listen(8000, () => {
//     console.log('Server is listening on port 8000');
// });

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Home Page</h1>');
        res.end();
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is the about page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Error page');
    }
});

server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
