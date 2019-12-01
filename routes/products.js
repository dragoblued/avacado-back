const express = require('express');

const router = express.Router();

const products = [
	{ id: 1, name: 'apple', time: "00.00", calories: "1245", squirrels: "10", 
carbohydrates: "233", fats: "24"},
	{ id: 2, name: 'banan', calories: "1345", squirrels: "20", 
carbohydrates: "253", fats: "64"}
];

router.get('/:id', (req, res, next) => {
	const {id} = req.params;
	const data = products.find((product) => String(product.id) === id);

	res.json({status: 'OK', data});
});
router.get('/', (req, res, next) => {
	res.json({status: 'OK', data: products});
});
router.post('/', (req, res, next) => {
	const {body} = req;
	const newProduct = {id: 3, name: 'kokos', time: "00.00", calories: "1245", squirrels: "10", 
carbohydrates: "233", fats: "24"};
	products.push(newProduct);
	res.json({status: "ok", data: newProduct});
});
module.exports = router;