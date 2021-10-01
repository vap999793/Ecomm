const express = require('express');

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res)=>{
    res.json({"Message":"Category Router"});
})

module.exports = {categoryRouter};