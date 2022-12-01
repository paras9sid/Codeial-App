const express = require('express');
const passport = require('passport');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

// second level of Authentication , so nobody can tamper with inspect element and spam the page , only signed user can post 
// checkAuthentication method is used - user cant edit html from inpect tool and fiddle with our website , authentication needed now

// router.post('/create',passport.checkAuthentication,postsController.create);

//w/o authentication method working fine.

router.post('/create',postsController.create);  // synced with postController  -- authentication method is creating error

router.get('/destroy/:id', postsController.destroy); // -- authentication method is creating error


module.exports = router;