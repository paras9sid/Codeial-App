const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

//second level of Authentication , so nobody can tamper with inspect element and spam the page , only signed user can post 
// checkAuthentication method is used
router.post('/create',passport.checkAuthentication,commentsController.create);

module.exports = router;