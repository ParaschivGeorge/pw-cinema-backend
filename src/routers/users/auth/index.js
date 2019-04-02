const login = require('./auth').login
const register = require('./auth').register
const AuthRouter = require("express").Router()

AuthRouter.post('/login', login)
AuthRouter.post('/register', register)

module.exports = AuthRouter