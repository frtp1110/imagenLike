module.exports = app => {

    //Configuración del puerto
    app.set('port', process.env.PORT || 3000);

    return app; 
}