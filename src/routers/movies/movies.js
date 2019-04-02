const Movie = require('../../models/movie')

let createMovie = async (req, res, next) => {
    
    const movie = new Movie(req.body)
    try {
        dbMovie = await Movie.findOne( {title: movie.title} )
        if (dbMovie) { 
            let err = new Error('this is movie already exists')
            err.statusCode = 400;
            return next(err) // return error to be handled by middleware
        }
        await movie.save() // save new movie to db
        res.status(201).send(movie)

    } catch (e) {
        return next(e)
    }
}

let findAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.send(movies)
    } catch (e) {
        res.status(500).send()
    }
}

let findOneMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id})

        if (!movie) {
            return res.status(404).send()
        }

        res.send(movie)
    } catch (e) {
        res.status(500).send()
    }
}

let updateMovie = async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const movie = await Movie.findOne({ _id: req.params.id })

        if (!movie) {
            return res.status(404).send()
        }

        updates.forEach((update) => movie[update] = req.body[update])
        await movie.save()
        res.send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
}

let deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.deleteOne({ _id: req.params.id })

        if (!movie) {
            res.status(404).send()
        }

        res.send(movie)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    createMovie: createMovie,
    findAllMovies: findAllMovies,
    findOneMovie: findOneMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie
}