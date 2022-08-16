const express = require('express');

const router = express.Router();


//defining v1-routes
router.use('/v1',require('./v1'));

module.exports = router;