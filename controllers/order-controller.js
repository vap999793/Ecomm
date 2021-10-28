const { Order } = require('../models/order');
const { Product } = require('../models/product');
const Joi = require('joi');

async function getOrders(req, res) {
    const orders = await Order.find().populate([
        {
            path: 'product',
            populate: 'category'
        },
        {
            path: 'user',
            select: '-password'
        }
    ]);

    res.json({ orders });
}

async function placeOrder(req, res, next) {
    const schema = Joi.object({
        orders: Joi.array()
            .items({
                product: Joi.string().required(),
                user: Joi.string().required(),
                address: Joi.string().required(),
                quantity: Joi.number().required()
            })
            .min(1).required()
    })

    const orderValidation = schema.validate(req.body);
    if (orderValidation.error) {
        return next(new Error(orderValidation.error.details[0].message));
    }

    const { orders } = orderValidation.value;

    for (index in orders) {
        let order = orders[index];
        let productId = order.product;
        let price = (await Product.findOne({ _id: productId })).price;
        orders[index].price = price;
    }
    const saveResult = await Order.create(orders);
    res.json({ orders: saveResult });

}

async function deleteOrder(request, response, next) {
    const _id = request.params.orderId;
    const result = await Order.deleteOne({ _id });
    response.json({ result });
}


async function updateOrder(request, response, next) {
    const _id = request.params.orderId;
    const body = request.body;

    const schema = Joi.object({
        product: Joi.string(),
        address: Joi.string(),
        quantity: Joi.number().min(1),
        status: Joi.boolean(),
        payment_method: Joi.string()
    });

    const { value, error } = schema.validate(body);

    if (error) {
        next(new Error(error.details[0].message));
        return;
    }

    if (value.product) {
        value.price = (await Product.findById(value.product)).price;
    }

    const result = await Order.findOneAndUpdate(
        { _id },
        { $set: value },
        { new: true }
    );
    response.json({ result });
}


module.exports = { getOrders, placeOrder, deleteOrder, updateOrder };