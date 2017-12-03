const express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    config = require('./config/app-config'),
    userModel = require('./models/user'),
    clientRouter = require('./routes/clientRouter')
    productRouter = require('./routes/productRoute'),
    invoiceRouter = require('./routes/invoiceRoute'),
    invoiceProductRouter = require('./routes/invoiceProductRouter')
userRouter = require('./routes/userRoute');



function startApp() {
    //create exress app
    var app = express();

    //set the host and port 
    app.set('hostname', process.env.hostname || 'localhost');
    app.set('port', process.env.port || 4001);

    // set application enviroment
    app.set('env', process.env.environemt || 'development');


    // use morgan for logging
    app.use(morgan('dev'));

    // body parser 
    app.use(bodyParser.json());

    // passport configurations	
    app.use(passport.initialize());

    // code for local strategy 
    //passport.use(new localStrategy(UserModel.authenticate()));
    //passport.serializeUser(UserModel.serializeUser());
    //passport.deserializeUser(UserModel.deserializeUser());

    //for index page
    app.get('/', function (req, res) {

        res.send('It is working');
    });



    //setup the routes
    app.use('/clients', clientRouter);
    app.use('/products', productRouter);
    app.use('/invoices', invoiceRouter);
    app.use('/invoiceproducts', invoiceProductRouter);
    //app.use('/user', userRouter);


    //catch 404 error and forward the error to next error middleware
    app.use(function (req, res, next) {
        var err = new Error('requested API end point not found');
        err.status = 404;
        next(err);
    });

    //main error handler middleware
    app.use(function (err, req, res, next) {
        if (app.get('env') === 'development') {
            res.status(err.status || 500).json({ message: err.message, error: err });
        } else {
            res.status(err.status || 500).json({ message: err.message });
        }
    });

    // start the server and listen 
    app.listen(app.get('port'), app.get('hostname'), function (req, res) {

        console.log(`API is running at http://${app.get('hostname')}:${app.get('port')}`);
    });
}

mongoose.connect(config.mongodbUrl);
var db = mongoose.connection;

//if error then abort the process
db.on('error', console.error.bind(console, 'failed to connect to mongo db'));

//if db connecttion is successful then proceed with rest of the steps
db.once('open', startApp);







