const { Comment, Image } = require('../models');

//Contador del total de imágenes a
async function imageCounter(){
    return await Image.countDocuments();
}

//Contador del total de comentarios 
async function commentsCounter(){
    return await Comment.countDocuments();
}

//Contador del total de vistas de las imágenes
async function imageTotalViewsCounter(){
    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);

    return result[0].viewsTotal;
}

//Contador del total de likes 
async function likesTotalCounter(){
    const result = await Image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$views'}
    }}]);

    return result[0].likesTotal;
}

module.exports = async () => {
    
    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}