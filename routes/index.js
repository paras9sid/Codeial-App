const express = require('express');
const { appendFile } = require('fs');

const router = express.Router();

//access home_controller.js
const homeController = require('../controllers/home_controller');

//check if router loaded or not
// console.log("Router Loaded");

router.get('/',homeController.home);
router.use('/users',require('./users')); // for localhost:8001/users/profile
// router.use('/',require('./users')); // for localhost:8001/profile
router.use('/posts',require('./posts')); // synced with post routes
router.use('/comments',require('./comments')); // comments calling



// api router

router.use('/api',require('./api'));



module.exports = router;