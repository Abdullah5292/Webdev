const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    isbn:String,
    name: String,
    year: String,
    genre: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Books', BookSchema);

module.exports = Book;