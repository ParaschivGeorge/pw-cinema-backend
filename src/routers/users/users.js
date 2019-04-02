const User = require('../../models/user')

let findAllUsers = async (req, res) => {
    try {
        const users = await User.find(req.query)
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
}

let findOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

let updateUser = async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const user = await User.findOne({ _id: req.params.id})

        if (!user) {
            return res.status(404).send()
        }

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

let deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id })

        if (!user) {
            res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    findAllUsers: findAllUsers,
    findOneUser: findOneUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}