
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prdtSchema = new Schema({
    Product_ID : {type:String , required:true , unique:true},
    Name : {type:String , required:true},
    Price : {type:Number , required:true},
    Featured : {type:Boolean},
    Rating : {type:Number},
    Created_At : {type:Date , required:true},
    Company : {type:String , required:true}
})

exports.productModel = mongoose.model('Product', prdtSchema)
//products