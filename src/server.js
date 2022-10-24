const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./route/web');
const db = require('./config/connectDB');
const cors = require('cors');
const moment = require('moment');
const { Logger } = require('mongodb');

const port = process.env.PORT || 4000;

db.connect();

// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }, { limit: '50mb' }));

app.use(cors({ origin: true }));

app.use('/', router);

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
})
