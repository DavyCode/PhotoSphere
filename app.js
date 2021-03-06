const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Gallery = require("./models/home"),
    path = require('path'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    LocalStrategy = require('passport-local'),
    flash = require('connect-flash'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    mongodb = require('mongodb'),
    User = require('./models/user'),

    app = express(),
    seedDB = require('./seeds');



// seedDB(); Seed database

const Comment = require("./models/comment");

//Require routes
const index = require('./routes/index');
const home = require('./routes/home');
const comment = require('./routes/comments');


// Connect to database
const db = mongoose.connect("mongodb://127.0.0.1:27017/PhotoSphere");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(flash());



// ==========
// PASSPORT CONFIG
// ==============================
app.use(require('express-session')({
    secret: "passport working magic",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', index);
app.use('/home', home);
app.use('/home/:id/comment', comment);












// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
//   console.log(err);
// });

module.exports = app;
