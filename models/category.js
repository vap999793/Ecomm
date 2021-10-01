const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:{type: String, required:true}
}, 
    {timestamps : 
        {
            createdAt:'created_at', 
            updatedAt:'updated_at'
        }
    }
)

const Category = mongoose.model("category", CategorySchema);

module.exports = {Category};