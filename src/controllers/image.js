const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
    //Permite encontrar una determinada imagen y retornarla
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    console.log(image);
    res.render('image', {image});
};

ctrl.create = (req, res) => {
    //console.log(req.file);
    
    const saveImage = async () => {
        const imgUrl = randomNumber();

        //Validación en caso repita el nombre de una imagen que ya esta registrada
        const images = await Image.find({filename: imgUrl});
    
        if(images.length > 0){
            saveImage();
        }else{
            console.log(imgUrl);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve('src/public/upload/' + imgUrl + ext);

            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();
                //res.send('Recibido!');
                //console.log(newImg);
                res.redirect('/images/' + imgUrl);
            }else{
                //No permite que los archivos que no sean los del formato de imagen se suban al servidor
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Solo se permiten imágenes'});
            }
        }
    };

    saveImage();
};

ctrl.like = (req, res) => {
    
};

ctrl.comment = (req, res) => {
    console.log(req.body);
    res.send('Comentario!')
};

ctrl.remove = (req, res) => {
    
};

module.exports = ctrl;