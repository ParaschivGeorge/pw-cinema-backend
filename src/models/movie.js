const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    releaseDate: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,  // ENUM action, adventure, animation, comedy, drama, fantasy, historical, horror, mystery, philosophical, romance, science fiction, thriller
        required: true,        
        validate(value) {
            if (!['action', 'adventure', 'animation', 'comedy', 'drama', 'fantasy', 'historical', 'horror', 'mystery', 'philosophical', 'romance', 'science fiction', 'thriller'].find(type => type === value) ) {
                throw new Error('Type is invalid')
            }            
        }
    },
})

movieSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'movie'
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie