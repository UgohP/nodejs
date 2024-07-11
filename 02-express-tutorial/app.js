const express = require('express')
const app = express()

app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/login', (req, res) => {
    const {name} = req.body

    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(404).send("Please enter a name")
})

app.listen(5000, () => {
    console.log('Port is runing on port 5000')
})
