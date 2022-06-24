//const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const {database} = require('./keys');

/*mongoose.connect(database_proyecto.URI)
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));

*/

mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then(db => console.log('Se estableció conexión con la database'))
    .catch(err => console.error(err));