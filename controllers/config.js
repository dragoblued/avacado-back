const shortid = require("short-id");
const { validate } = require("jsonschema");
const db = require("../database/db");

const editConfig = (req, res, next) => {
  const editedConfig = db
    .get("config")
    .assign(req.body)
    .value();

  db.write();
  res.json({ status: "OK", data: editedConfig });
};

const getConfig = (req, res, next) => {
  let config = {};
  try {
    config = db.get("config");
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: "OK", data: config });
};

module.exports = {
  editConfig,
  getConfig
};
