const express = require('express');

const productRouter = express.Router();

productRouter.get('/', (req, res)=>{
    res.json({"Message":"product Router"});
})

module.exports = {productRouter};