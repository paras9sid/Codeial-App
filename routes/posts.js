const express = require('express');
const passport = require('passport');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

//second level of Authentication , so nobody can tamper with inspect element and spam the page , only signed user can post 
// checkAuthentication method is used
// router.post('/create',passport.checkAuthentication,postsController.create);
router.post('/create',postsController.create);
// router.get('/destroy/:id',passport.checkAuthentication , postsController.destroy);


module.exports = router;