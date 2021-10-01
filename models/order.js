const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    
    price: {type: Number, required:true},
    product: {type:mongoose.Types.ObjectId, ref:'product', required:true},
    user: {type:mongoose.Types.ObjectId, ref:'user', required:true},
    address : {type:String, required:true},
    quantity : {type:Number, required:true},
    payment_method : {type:String, required:true, default:"COD"},
    status : {type:Boolean, required:true}
}, 
    {timestamps : 
        {
            createdAt:'created_at', 
            updatedAt:'updated_at'
        }
    }
)

const Order = mongoose.model("order", OrderSchema);

module.exports = {Order};