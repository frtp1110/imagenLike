const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');


module.exports = app => {

    //Configuración del puerto
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    
    //Permite el uso y configuración de handlebars
    app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));

    app.set('view engine', '.hbs');

    //Middleware
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //Routes
    routes(app);

    //Static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //Errohandlers
    if('development' === app.get('env')){
        app.use(errorHandler);
    }

    return app; 
}