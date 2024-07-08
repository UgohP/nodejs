const express = require('express')
const app = express()
const { products } = require('./data')
const logger = require('./logger')
app.use(logger)

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href = "api/products"> products</a>')
})
app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product
        return { id, name, image }
    })
    res.json(newProducts)
})
app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params

    const singleProduct = products.find((product) => product.id === Number(productID))
    if (!singleProduct) {
        return res.status(404).send('Sorry, product does not exist')
    }
    return res.json(singleProduct)
})
app.get('/api/products/:productID/reviews/:reviewsID', (req, res) => {
    console.log(req.params)
    res.send('Hello world')
})
app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    res.status(200).json(sortedProducts)
})
app.listen(5000, () => {
    console.log('Server is listening to port 5000')
})