const express = require('express')
const app = express()
const tasks = require('./routers/tasks')

//middleware
app.use(express.json())

app.get('/hello', (req, res) => {
    res.send('Hello World')
})

app.use('/api/v1/tasks', tasks)

const port = 3000
app.listen(port, console.log(`Server is listening to port ${port}.....`))