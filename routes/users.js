const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/login',usersController.login);

router.post('/create', usersController.create);

// for manual authentication and create session
// router.post('/create-session',usersController.createSession);

//session creating via passport as a middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/login'}
), usersController.createSession);

router.get('/sign-out',usersController.destroySession);

module.exports = router;
