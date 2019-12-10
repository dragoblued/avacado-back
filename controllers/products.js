const shortid = require('short-id');
const { validate } = require('jsonschema');
const db = require('../database/db');

const getProducts = (req, res, next) => {
	let products = [];
	try {
		products = db.get('products');
	} catch (error) {
		throw new Error(error);
	}
	res.json({status: 'OK', data: products});
}

const getProduct = (req, res, next) => {
  const { id } = req.params;

  const product = db
    .get('products')
    .find({ id })
    .value();

  if (!product) {
    throw new Error('TASK_NOT_FOUND');
  }

  res.json({ status: 'OK', data: product });
}


const createProduct = (req, res, next) => {
  const productSchema = {
    type: 'object',
    properties: {
      name : {type: 'string'},
  		time : {type: 'string'},
  		calories : {type: 'integer'},
  		squirrels : {type: 'integer'},
  		carbohydrates : {type: 'integer'},
  		fats : {type: 'integer'}
    },
    required: ['name', 'time', 'calories', 'squirrels', 'carbohydrates', 'fats'],
    additionalProperties: false
  };

  const validationResult = validate(req.body, productSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const { name, time, calories, squirrels, carbohydrates, fats } = req.body;
  const product = {
    id: shortid.generate(),
    name,
    time,
    calories,
    squirrels,
    carbohydrates,
    fats
  };

  try {
    db.get('products')
      .push(product)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: product
  });
};

const deleteProduct = (req, res, next) => {
  db.get('products')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	deleteProduct
}