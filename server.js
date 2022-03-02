// require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'));

app.get ('/',(req,res)=>{
    res.send({message:"Welcome to our Backend Project  - Ndiphiwe & Unathi"})
})
app.use(express.json())
app.use(cors());

const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)



app.listen(process.env.PORT || 8000, () => console.log("Server Started"))