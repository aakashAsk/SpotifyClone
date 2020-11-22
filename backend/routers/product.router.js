const express = require('express');
const productController = require('../controllers/product');
const productRouter = express.Router();

productRouter.post('/addproduct', productController.addProduct);
productRouter.get('/findproduct/:id', productController.findById);
productRouter.post('/review', productController.addReview);
productRouter.get('/deleteReview/:id', productController.deleteReview);
productRouter.get('/fetchAllProduct', productController.fetchAllProduct);

module.exports = productRouter;