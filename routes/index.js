const express = require('express');
const router = express.Router();
const api = require('../Controllers/api');
const Api = new api();

router.get('/data', Api.getUserData);

module.exports = router;
