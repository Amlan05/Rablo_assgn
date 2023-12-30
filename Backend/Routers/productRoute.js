const express = require('express')
const productRouter = express.Router()
const prdt = require('../Controllers/productController')

productRouter
 .get('/', prdt.getAllProduct)
 .post('/below', prdt.getBelowPrice)
 .post('/above', prdt.getAbovePrice)
 .get('/ft', prdt.getFeaturedProduct)
 .post('/add',prdt.addProduct)
 .delete('/:id',prdt.deleteProduct)
 .patch('/:id', prdt.updateProduct)

exports.productRouter = productRouter