const express = require('express')
const app = express()
const tasks = require('./routers/tasks')
const connectDB =  require('./db/connect')
const notFound = require('./middleware/not-found')
//middleware
app.use(express.json())
require('dotenv').config()

app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)
app.use(notFound)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening to port ${port}.....`))
    }catch(error){
        console.log(error)
    }
}

start()