const mongoose = require("mongoose");  

const cartSchema = mongoose.Schema({
    name: String, 
    img: String, 
    price: {type:Number, required: true},
    mrp: String,
    brand:String,
})


const CartModel = mongoose.model("cart",cartSchema); 


module.exports = {
    CartModel 
}