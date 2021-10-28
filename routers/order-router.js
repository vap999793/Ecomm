const express = require('express');
const {getOrders, placeOrder, deleteOrder, updateOrder} = require('../controllers/order-controller')
const { adminAuthentication, userAuthentication } = require('../middlewares/user-auth');

const orderRouter = express.Router();

orderRouter.get('/',adminAuthentication, getOrders);
orderRouter.post('/', userAuthentication, placeOrder);
orderRouter.put('/:orderId', userAuthentication, updateOrder);
orderRouter.delete('/:orderId', userAuthentication, deleteOrder);

module.exports = {orderRouter};