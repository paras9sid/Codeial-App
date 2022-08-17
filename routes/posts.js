const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

//second level of Authentication , so nobody can tamper with inspect element and spam the page , only signed user can post 
// checkAuthentication method is used
router.post('/create',passport.checkAuthentication,postsController.create);

module.exports = router;