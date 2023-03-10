const cars = require('./db.json')
let globalId = 11

module.exports = {
    getCars: (req, res) => res.status(200).send(cars),
    deleteCars: (req, res) => {
        let index = cars.findIndex(elem => elem.id === +req.params.id)
        cars.splice(index, 1)
        res.status(200).send(cars)
    },
    createCars: (req, res) => {
        let { title, rating, imageURL } = req.body
        let newCars = {
            id: globalId,
            title, 
            rating,
            imageURL
        }
        cars.push(newCars)
        res.status(200).send(cars)
        globalId++
    },
    updateCars: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = cars.findIndex(elem => +elem.id === +id)
        if (cars[index].rating === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (cars[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            cars[index].rating++
            res.status(200).send(cars)
        } else if (type === 'minus') {
            cars[index].rating--
            res.status(200).send(cars)
        } else {
            res.sendStatus(400)
        }
    }
}