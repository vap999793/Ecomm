const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { UPLOAD_FOLDER } = process.env;

const { getProducts, getProduct, createProduct } = require('../controllers/product-controller')
const { adminAuthentication } = require('../middlewares/user-auth');

const productRouter = express.Router();

const tempMulter = multer({ dest: UPLOAD_FOLDER });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = path.join(__dirname, "../") + UPLOAD_FOLDER;

        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const fileName = mongoose.Types.ObjectId() + ".png";
        cb(null, fileName);
    },
});
const upload = multer({ storage });

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProduct);
productRouter.post('/', adminAuthentication, upload.single("image"), createProduct);

module.exports = { productRouter };