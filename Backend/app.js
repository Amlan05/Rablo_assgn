
//dependencies 
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();


const app = express()
const port = process.env.PORT || 5000;
const productRoute = require('./Routers/productRoute')
const userRoute = require('./Routers/userRoute')

//middlewares 
app.use(cors())
app.use(express.json())
app.use('/products', productRoute.productRouter)
app.use('/user', userRoute.userRouter)
app.use((err, req, res, next) => {
    console.error(err);
  
    // Respond with a 500 Internal Server Error
    res.status(500).json({ error: 'Internal Server Error' });
  });

//connecting database
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.Mongodb_userName}:${process.env.password}@cluster0.lccityh.mongodb.net/?retryWrites=true&w=majority`);
  console.log("Connected to database")
} 


//Creating server
app.listen(port, ()=> {
    console.log("server started")
})