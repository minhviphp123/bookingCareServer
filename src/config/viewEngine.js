const express = require('express');

function cfViewEngine(app) {
    app.use(express.static('./src/public')); //public file

    app.set('view engine', 'ejs');
    app.set('views', './src/view');
}

module.exports = cfViewEngine;