// calling the required modules.
require("dotenv").config();
const express = require("express");
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");
const { MONGO_URI } = process.env; 
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");

// do note that process.env items will print out the semi-colon too as that is not markup to it.

//Set up default mongoose connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}); // some default settings for the DB and API - although, I think I read that these are default by default.

const db = mongoose.connection; //Get the default connection

db.on('error', console.error.bind(console, 'MongoDB connection error:')); // whenever an error occurs, this executes.


//importing the routers – yes I chose those names for length symmetry — until the last two.
const usersRouter = require("./routes/usersRouter.js");
const indexRouter = require("./routes/trackerRouter.js");
const statsRouter = require("./routes/statsRouter.js");
const settingsRouter = require("./routes/settingsRouter.js");
const FAQRouter = require("./routes/FAQRouter.js")


//constructing the app object
const app = express();

//setting up the view engine, for the views in views.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setting up the necessary middleware and express options.
app.use(compression());
app.use(helmet())
app.use(cors()); // remove this eventually.
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// setting them to use this prefix
app.use("/",      indexRouter);
app.use("/user", usersRouter);
app.use("/stats", statsRouter);
app.use("/settings", settingsRouter);
app.use("/FAQ", FAQRouter);

//catching any unfound ones (Error 404) and passing it to the error handler.
app.use(function(req, res, next) {
    next(createError(404));
});

// the error handler
app.use((err, req, res, next) => {
    // setting locals, only in use in dev.
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the 'rror - if nothing, then defaults to INTERNAL SERVER ERROR
    res.status(err.status || 500);
    res.render('error', { message: res.locals.message, error: res.locals.error });
});

//exporting it
module.exports = app;