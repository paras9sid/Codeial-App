const express = require('express');

const router = express.Router();

//post router
router.use('/posts',require('./posts'));

module.exports = router;