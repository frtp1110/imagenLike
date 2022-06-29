const { Comment, Image } = require('../models');

module.exports = {

    async newest(){
        const comments = await Comment.find()
            .limit(5)
            .sort({ timestamp: -1 });

        //Recorre el arreglo de comentarios
        for (const comment of comments){
            //Trae la imagen asociada al comentario para mostrarla en pantalla
            const image = Image.findOne({_id: comment.image_id});
            comment.image = image; 
        }

        return comments;
    }
}
