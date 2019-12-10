const shortid = require('short-id');
const { validate } = require('jsonschema');
const db = require('../database/db');

const getUsers = (req, res, next) => {
	let users = [];
	try {
		users= db.get('users');
	} catch (error) {
		throw new Error(error);
	}
	res.json({status: 'OK', data: users});
}

const createUser = (req, res, next) => {
	const userSchema= {
    type: 'object',
    properties: {
    userName : {type: 'string'},
		password : {type: 'string'},
    },
    required: ['userName', 'password'],
    additionalProperties: false
  };

  const validationResult = validate(req.body, userSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }
  const { userName, password } = req.body;
  const user = {
    id: shortid.generate(),
    userName,
    password
  };

  try {
    db.get('users')
      .push(user)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: user
  });
};

module.exports = {
	createUser,
	getUsers
}