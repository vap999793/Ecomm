const express = require('express');
const {getCategories, createCategory, getCategory} = require('../controllers/category-controller')

const categoryRouter = express.Router();
const {adminAuthentication} = require('../middlewares/user-auth');

categoryRouter.get('/', getCategories);
categoryRouter.post('/',adminAuthentication, createCategory);
categoryRouter.get('/:categoryId', getCategory);

module.exports = {categoryRouter};