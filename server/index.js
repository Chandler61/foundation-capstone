const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
    getCars,
    deleteCars, 
    createCars, 
    updateCars
} = require('./controller')

app.get(`/api/cars`, getCars)
app.delete(`/api/cars/:id`, deleteCars)
app.post(`/api/cars`, createCars)
app.put(`/api/cars/:id`, updateCars)

app.listen(4004, () => console.log(`running on 4004`))