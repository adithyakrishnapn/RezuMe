const mongoose = require('mongoose');

const connect = function () {
    const url = 'mongodb://localhost:27017';
    const dbname = 'Rezume_Register';

    return mongoose.connect(url + '/' + dbname)
        .then(() => {
            console.log('Connected to the database');
        })
        .catch(err => {
            console.error('Failed to connect to the database:', err);
            throw err; // Rethrow the error
        });
};

module.exports.connect = connect;

module.exports.get = function () {
    return mongoose.connection;
};
