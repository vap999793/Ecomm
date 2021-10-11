const { Category } = require('../models/category');
const Joi = require('joi');

async function getCategories(req, res) {
    const categories = await Category.find();
    res.json({ categories });
}


async function getCategory(request, response) {
    const _id = request.params.categoryId;
    const category = await Category.findOne({ _id });
    response.json({ category });
}

async function createCategory(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(10).required()
    });

    const categoryValidation = schema.validate(req.body);

    if (!categoryValidation.error) {
        const name = categoryValidation.value.name;
        const category = new Category({ name });
        const result = await category.save();
        return res.json({ result });
    }

    res.status(401);
    return next(new Error(categoryValidation.error.details[0].message));
}

module.exports = { getCategories, createCategory, getCategory };