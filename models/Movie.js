const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    id: Number,
    title: String,
    year: String,
    genre: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Movie = mongoose.model('Movies', MovieSchema);

module.exports = Movie;

