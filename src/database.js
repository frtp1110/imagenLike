//const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const {database} = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
    .then(db => console.log('Se estableció conexión con la base de datos'))
    .catch(err => console.error(err));