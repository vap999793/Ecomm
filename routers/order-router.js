const express = require('express');
const {getOrders} = require('../controllers/order-controller')

const orderRouter = express.Router();

orderRouter.get('/',getOrders);

module.exports = {orderRouter};