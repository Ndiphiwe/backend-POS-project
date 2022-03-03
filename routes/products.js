const express = require('express')
const product = require('../models/product')
const router = express.Router()
const Product = require('../models/product')

//GET ALL
router.get('/', async (req, res) => {
    // res.send("Hey there... world") 
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
 
// GET ONE
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product)
})


// CREATE ONE
router.post('/', async (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err){
        res.status(400).json({ message: err.message})
    }
})


// UPDATE ONE
router.patch('/:id', getProduct, async (req, res) => {
    if(req.body.name != null){
        res.product.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.product.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE ONE
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove()
        res.json({ message: "Deleted product"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getProduct(req, res, next){
    let product
    try{
        product = await Product.findById(req.params.id)
        if(product == null){
            return res.status(404).json({ message: 'cannot find product' })
        }
    } catch(err){
        return res.status(500).json({ message: err.message }) 
    }

    res.product = product
    next()
}




module.exports = router