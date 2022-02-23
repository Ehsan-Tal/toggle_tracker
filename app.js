// calling the required modules.
const express = require("express");
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//importing the routers – yes I chose those names for length symmetry
const usersRouter = require("./routes/users.js");
const indexRouter = require("./routes/index.js");
const statsRouter = require("./routes/stats.js");

//constructing the app object
const app = express();

//setting up the view engine, for the views in views.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setting up the necessary middleware and express options.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setting them to use this prefix
app.use("/",      indexRouter);
app.use("/users", usersRouter);
app.use("/stats", statsRouter);

//catching any unfound ones (Error 404) and passing it to the error handler.
app.use(function(req, res, next) {
    next(createError(404));
});

// the error handler
app.use((err, req, res, next) => {
    // setting locals, only in use in dev.
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the 'rror
    res.status(err.status || 500);
    res.render('error');
});

//exporting it
module.exports = app;