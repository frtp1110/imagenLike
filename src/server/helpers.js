const moment = require('moment');
const helpers = {};

//timeago --> es el nombre de la función
helpers.timeago = timestamp => {
    //Devuelve el dato en formato de minutos
    return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;