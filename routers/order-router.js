const express = require('express');

const orderRouter = express.Router();

orderRouter.get('/', (req, res)=>{
    res.json({"Message":"order Router"});
})

module.exports = {orderRouter};