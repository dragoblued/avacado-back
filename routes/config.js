const express = require('express');

const router = express.Router();
const configController = require('../controllers/config');

router.patch('/', configController.editConfig);
router.get('/', configController.getConfig);

module.exports = router;