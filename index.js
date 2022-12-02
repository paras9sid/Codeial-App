const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8001;

//library importing express ejs layouts
const expressLayouts = require('express-ejs-layouts');

//connection to db
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

//connect-flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle:'extended',
    prefix:'/css'
})); //

app.use(express.urlencoded({extended:false})); //extended true for removing deprecateed warning
app.use(cookieParser());

app.use(express.static('./assets'));//accessing static folder -- assets

//multer upload file - make the uplaod path availabel to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts); // using express ejs layouts

//extract styles and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


//session - now mongo store is use to store to the session cookie
app.use(session({
    name:'codeial',

    //todo -- change secret before deployment in production mode
    secret:'somethingblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100) 
    },
    store: MongoStore.create(
    { //now mongo store is use to store to the session cookie
        mongoUrl : "mongodb://localhost/codeial_development_db",
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'Mongo store setup is Ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//connect-flash setup after sessions
app.use(flash());
app.use(customMware.setFlash);


//routes started
//use express router - always after middle ware , body parser   and templagte engines for working of everything smoothly

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        //interpolition method
        console.log(`Error running server : ${err}`);
    }
    console.log(`Running successfully on port : ${port}`);
});