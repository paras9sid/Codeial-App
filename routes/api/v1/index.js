const express = require('express');

const router = express.Router();

//post router
router.use('/posts',require('./posts'));

router.use('/users',require('./users'));


module.exports = router;