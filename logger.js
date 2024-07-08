// var url = 'http://mylogger.io/log'

// function log(message) {
//     console.log(message);
// }

// module.exports.log = log;

const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
}

module.exports = logger