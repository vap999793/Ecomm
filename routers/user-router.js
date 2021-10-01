const express = require('express');

const userRouter = express.Router();

userRouter.get('/', (req, res)=>{
    res.json("userRouter");
})

module.exports = {userRouter};