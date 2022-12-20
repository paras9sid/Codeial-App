const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// router.get('/profile',passport.checkAuthentication,usersController.profile);

//finding all the users and after ejs file section friends making
//check auth - error will not render user details page after clicking on user name in friends.
// router.get('/profile/:id',passport.checkAuthentication,usersController.profile); -- check auth will create error

router.get('/profile/:id',usersController.profile);
router.post('/update/:id',usersController.update);



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



//defining routes - using with google oauth

router.get('/auth/google' , passport.authenticate('google' , {scope : ['profile','email']}));

router.get('auth/google/callback' , passport.authenticate('google', {failureRedirect:'/users/login'}),usersController.createSession);

module.exports = router;
