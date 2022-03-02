const express = require('express')
const user = require('../models/user')
const router = express.Router()
const User = require('../models/user')

//GET ALL
router.get('/', async (req, res) => {
    // res.send("Hey there... world") 
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
 
// GET ONE
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})


// CREATE ONE
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err){
        res.status(400).json({ message: err.message})
    }
})

// UPDATE ONE
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.name != null){
        res.user.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.user.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE ONE
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "Deleted user"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({ message: 'cannot find user' })
        }
    } catch(err){
        return res.status(500).json({ message: err.message }) 
    }

    res.user = user
    next()
}




module.exports = router