const createError = require('http-errors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport =  require('passport');
const engine = require('ejs-layout');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ussdRouter = require('./routes/usssd');
const adminRouter = require('./routes/admin');
const Auth = require('./auth/admin_auth');

const uri = "mongodb+srv://unicef_user:password654321@cluster0-8id7m.mongodb.net/unicefdatabase?retryWrites=true";
mongoose.connect(uri, {useNewUrlParser: true });

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs',engine.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'mysecretpassword',
  saveUninitialized: false,
  resave: false
}));

app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ussd', ussdRouter);

app.use((req,res,next)=>{
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.user = req.session.user;
    next();
});

app.use('/admin',Auth.admin_auth,adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
