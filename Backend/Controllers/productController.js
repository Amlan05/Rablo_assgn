const product = require('../Model/productModel')


//controller functions

//get all products
exports.getAllProduct = async(req, res, next) => {
    let products
    try{
        products = await product.productModel.find()
    }
    catch(err){
        return console.log(err)
    }
    if(!products){
        return res.status(400).json({message: 'Error occured'})
    }
    return res.status(200).json({products})
}

//add a product
exports.addProduct = async (req, res, next ) => {
    const data = {productId, nameP, price, featured, rating, created, company} = req.body

    let newProduct
    try{
        newProduct  = new product.productModel({
            Product_ID : productId,
            Name : nameP,
            Price : price,
            Featured : featured,
            Rating : rating,
            Created_At : new Date(created),
            Company : company
        })

        await newProduct.save()
    }
    catch(err){
        return console.log(err)
    }

    if(!newProduct){
        return res.status(400).json({message: "Some error occured"})
    }
    return res.status(200).json({message: "Product added successfull", newProduct: newProduct})
}

//deleting a product

exports.deleteProduct = async(req, res, next) => {
    let delproduct
    const {id} = req.params
    try{
        delproduct = await product.productModel.findOneAndDelete({Product_ID: id})
    }
    catch(err){
        console.log(err)
    }
    if(!delproduct){
        return res.status(400).json({message: "Some error occured"})
    }
    return res.status(200).json({message: "Product deleted successfully"})
}

//updating a product

exports.updateProduct = async (req, res, next) => {
    const {id} = req.params
    //key in the update data should be same as that of mongoose schema key
    const updateData = req.body
    let updatedProduct
    try{
        updatedProduct = await product.productModel.findOneAndUpdate({Product_ID: id}, updateData, {new: true})
    }
    catch(err){
        return res.status(500).send('Internal Server Error');
    }

    if (!updatedProduct){
        return res.status(404).json({message: "Product not found"})
    }
    return res.status(200).json({message: "Product updated successfully", updatedProduct})
}

//fetching featured products
exports.getFeaturedProduct = async(req, res, next) => {
    let ftPrdt
    try{
        ftPrdt = await product.productModel.find({Featured: true})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server error"})
    }

    if(!ftPrdt){
        return console.log("No featured product found")
    }
    return res.status(200).json({message: "Fetch successful", ftPrdt})
}

//fetching products less than a certain value
exports.getBelowPrice = async(req, res, next) => {
    const {lowPrice} = req.body
    let lowProducts
    try{
        lowProducts = await product.productModel.find({Price : {$lt: lowPrice}})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "some error occured"})
    }
    if(!lowProducts){
        return res.status(404).json({message: "No products found"})
    }
    return res.status(200).json(lowProducts)
}

//fetching products greater than a certain value
exports.getAbovePrice = async(req, res, next) => {
    const {highPrice} = req.body
    let highProducts
    try{
        highProducts = await product.productModel.find({Price : {$gt: highPrice}})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Some error occured"})
    }
    if(!highProducts){
        return res.status(404).json({message: "No products found"})
    }
    return res.status(200).json(highProducts)
}