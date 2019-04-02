const AppRouter = require("express").Router()
const usersRoutes = require('./users')
const moviesRoutes = require('./movies')
const reviewsRoutes = require('./reviews')

AppRouter.use("/users", usersRoutes)
AppRouter.use("/movies", moviesRoutes)
AppRouter.use("/reviews", reviewsRoutes)

module.exports =  AppRouter