const ctrl = {};

const { Image } = require('../models');

ctrl.index = async (req, res) => {
    //Ordena las imágenes por medio de la fechas (timestamp)
    const images = await Image.find().sort({timestamp: -1}).lean(); 
    res.render('index', {images});
};

module.exports = ctrl;