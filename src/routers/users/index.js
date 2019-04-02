const auth = require("./auth")
const UserRouter = require("express").Router()

const updateUser = require('./users').updateUser
const findAllUsers = require('./users').findAllUsers
const findOneUser = require('./users').findOneUser
const deleteUser = require('./users').deleteUser

UserRouter.put('/:id', updateUser)
UserRouter.get('', findAllUsers)
UserRouter.get('/:id', findOneUser)
UserRouter.delete('/:id', deleteUser)

UserRouter.use("/auth", auth)
module.exports = UserRouter