
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
    try {
        await mongoose.connect("mongodb+srv://Webdev:12345@webdevasig.pjajynu.mongodb.net/")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

const router = require('./routes/index');
app.use('/', router);

// app.use(function (req, res, next) {
//     console.log(req.body)
//     next(createError(404)); // middleware 
// });

const PORT = 3000;
app.listen(PORT, console.log(`Server running port ${PORT}`));