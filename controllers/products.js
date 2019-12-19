const shortid = require("short-id");
const { validate } = require("jsonschema");
const db = require("../database/db");

const getProducts = (req, res, next) => {
  let products = [];
  try {
    products = db.get("products");
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: "OK", data: products });
};

const getProduct = (req, res, next) => {
  const { id } = req.params;

  const product = db
    .get("products")
    .find({ id })
    .value();

  if (!product) {
    throw new Error("TASK_NOT_FOUND");
  }

  res.json({ status: "OK", data: product });
};

const editProduct = (req, res, next) => {
  const editedProduct = db
    .get("products")
    .assign(req.body)
    .value();

  db.write();
  res.json({ status: "OK", data: editedProduct });
};

const createProduct = (req, res, next) => {
  const productSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      time: { type: "string" },
      calories: { type: "number" },
      proteins: { type: "number" },
      fats: { type: "number" },
      carbohydrates: { type: "number" }
    },
    required: [
      "id",
      "name",
      "time",
      "calories",
      "fats",
      "proteins",
      "carbohydrates"
    ],
    additionalProperties: false
  };

  const validationResult = validate(req.body, productSchema);
  if (!validationResult.valid) {
    throw new Error("INVALID_JSON_OR_API_FORMAT");
  }

  const { id, name, time, calories, proteins, fats, carbohydrates } = req.body;
  const product = {
    id,
    name,
    time,
    calories,
    proteins,
    fats,
    carbohydrates
  };

  try {
    db.get("products")
      .push(product)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: "OK",
    data: product
  });
};

const deleteProduct = (req, res, next) => {
  db.get("products")
    .remove({ id: req.body.id })
    .write();

  res.json({ status: "OK" });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  editProduct
};
