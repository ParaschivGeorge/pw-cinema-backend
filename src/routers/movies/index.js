const MoviesRouter = require("express").Router()

const createMovie = require('./movies').createMovie
const updateMovie = require('./movies').updateMovie
const findAllMovies = require('./movies').findAllMovies
const findOneMovie = require('./movies').findOneMovie
const deleteMovie = require('./movies').deleteMovie

MoviesRouter.post('', createMovie)
MoviesRouter.put('/:id', updateMovie)
MoviesRouter.get('', findAllMovies)
MoviesRouter.get('/:id', findOneMovie)
MoviesRouter.delete('/:id', deleteMovie)

module.exports = MoviesRouter