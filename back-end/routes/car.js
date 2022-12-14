const express = require('express')
const app = express()
const router = express.Router()
const Cars = require('../models/car.models')

const multer  = require('multer')

app.use(express.json())

const Storage = multer.diskStorage({
    destination:'F:/WorkArea/CarSale/back-end/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploads = multer({
    storage: Storage
}).single('testImage')


router.get('/', async (req, res) => {
    try {
        const car = await Cars.find()
        res.json(car)
    } catch (err) {
        res.send('Err: ' + err)
    }
})


router.post('/',async(req, res) => {
    uploads(req,res,(err)=> {
        if (err) {
            console.log(err);
        } else {
            const cars = new Cars({
                type: req.body.type,
                description: req.body.description,
                price: req.body.price,
                image:{
                    data: req.file.filename,
                    contentType: 'image/png'
                } 
            })
            cars.save()
                .then(() => {
                    res.send("Car uploaded successfully");
                }).catch((err) => {
                res.send("Not uploaded");
            })
        }
    })
})


router.get('/:id', async(req, res) => {
    try{
        const cars = await Cars.findById(req.params.id)
        res.json(cars)
    }catch(err) {
        res.send('Err: ' + err)
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const cars = await Cars.findById(req.params.id)
        const response = await Cars.remove()

        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const cars = await Cars.findById(req.params.id)
        post.type = req.body.type,
        post.description = req.body.description,
        post.price = req.body.price
        post.photo = req.body.photo

        const response = await cars.save()
        res.json(response)

    } catch (err) {
        res.send('Err: ' + err)
    }
})

module.exports = router