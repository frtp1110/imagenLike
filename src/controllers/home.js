const ctrl = {};

const { Image } = require('../models');

const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    //Ordena las imágenes por medio de la fechas (timestamp)
    const images = await Image.find().sort({timestamp: -1}).lean(); 
    let viewModel = {images: []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    res.render('index', viewModel);
};

module.exports = ctrl;