// const express = require('express')
// const app = express()
// const tasks = require('./routers/tasks')
// const connectDB =  require('./db/connect')
// const notFound = require('./middleware/not-found')
// //middleware
// app.use(express.json())
// require('dotenv').config()

// app.use(express.static('./public'))

// app.use('/api/v1/tasks', tasks)
// app.use(notFound)

// const port = 3000

// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URL)
//         app.listen(port, console.log(`Server is listening to port ${port}.....`))
//     }catch(error){
//         console.log(error)
//     }
// }

// start()

const express= require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()
const tasks = require('./routers/task')
app.use('/api/v1/tasks', tasks)
app.use(express.json())


app.use(express.static('./public'))

port = 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log('App is listening to port 5000')
        })
        
    }
    catch(error){
        console.log(error)
    }
}

start()
