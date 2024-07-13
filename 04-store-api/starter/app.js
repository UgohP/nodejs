require('dotenv').config()
// async errors

const express = require('express')
const app =  express()
const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

// middleware
app.use(express.json())

// rootes
app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})


// products route
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening to ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}

start()