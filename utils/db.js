const mongoose = require('mongoose');
const env = require('../config/setting')
const DB_URL = env.db_ip;

mongoose.connect(DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error:' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;