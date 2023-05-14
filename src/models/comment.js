/*const mongoose = require('mongoose');
const { Schema } = mongoose;*/

//Lo mismo que lo anterior solo que se resume a una sola línea
const { Schema, model } = require('mongoose'); 

//const ObjectId = Schema.ObjectId --> otra forma de llamar al object
const { ObjectId } = Schema;

const CommentSchema = new Schema({
    image_id: { type: ObjectId},
    email: { type: String},
    name: { type: String},
    gravatar: { type: String},
    comment: { type: String},
    timestamp: { type: Date, default: Date.now}
});

//Variable virtual para obtener los comentarios asociados a la imagen
CommentSchema.virtual('image')
    .set(function(image){
        this._image = image;
    })
    .get(function(){
        return this._image;
    });

module.exports = model('Comment', CommentSchema);