const mongoose = require('mongoose');
const { collection } = require('../model/userModel');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mingDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log('err db');
    }
}

module.exports = {
    connect
}