const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);
router.post('/', productsController.createProduct);
router.delete('/', productsController.deleteProduct);
router.patch('/', productsController.editProduct);

module.exports = router;