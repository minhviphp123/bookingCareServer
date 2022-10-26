const mongoose = require('mongoose');
const { collection } = require('../model/userModel');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://minheus2k:matkhau1234@cluster0.ddx8swm.mongodb.net/?retryWrites=true&w=majority', {
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

//mongodb://localhost:27017/mingDB
//mongodb+srv://minheus2k:matkhau1234@cluster0.ddx8swm.mongodb.net/mingDB