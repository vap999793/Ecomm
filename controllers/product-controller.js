const Joi = require('joi');
const { Product } = require('../models/product');
const { UPLOAD_FOLDER } = process.env;

async function getProducts(req, res, next) {
    const limit = Number.parseInt(req.query.pagesize) || 20;
    const page = Number.parseInt(req.query.page) || 1;
    const sort_by = req.query.sort;
    const skip = limit * (page - 1);

    const products = await Product.find().sort(sort_by).skip(skip).limit(limit);
    const count = await Product.countDocuments();
    res.json({ products, count });
}


async function getProduct(req, res, next) {
    const _id = req.params.productId;
    const product = await Product.findOne({ _id });
    res.json({ product });
}


function validateProduct(data) {
    // name , price , discount, productImage , category , active
    const productSchema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        price: Joi.number().min(1).required(),
        discount: Joi.number(),
        category: Joi.string().required(),
        active: Joi.boolean(),
    });

    const result = productSchema.validate(data);
    return result;
}

async function createProduct(request, response, next) {
    // create
    console.log(request.file);

    const productImage = UPLOAD_FOLDER + "/" + request.file.filename;

    const validationResult = validateProduct(request.body);
    if (validationResult.error) {
        return next(new Error(validationResult.error.details[0].message));
    }

    let product = new Product({
        ...validationResult.value,
        productImage,
    });

    product = await product.save();
    // console.log(request.bodyro);
    response.json({ product });
}

module.exports = { getProducts, getProduct, createProduct };