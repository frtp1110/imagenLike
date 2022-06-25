const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require('../models');
const { CommentsController } = require('moongose/controller');

const ctrl = {};

ctrl.index = async (req, res) => {
    //Permite encontrar una determinada imagen y retornarla
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    //console.log(image);
    image.views = image.views + 1;
    await image.save();
    const comments = await Comment.find({image_id: image._id});
    res.render('image', {image, comments});
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
                //Evita que los archivos que no sean los del formato de imagen se suban al servidor
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Solo se permiten imágenes'});
            }
        }
    };

    saveImage();
};

ctrl.like = (req, res) => {
    
};

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        //console.log(newComment);
        await newComment.save();
        //res.send('Comentario!');
        res.redirect('/images/' + image.uniqueId);
    }
};

ctrl.remove = (req, res) => {
    
};

module.exports = ctrl;