const User = require('../../../models/user')

let register = async (req, res, next) => {
    
    const user = new User(req.body)
    console.log(user)
    try {
        dbuser = await User.findOne( {email:user.email} )
        if (dbuser) { 
            let err = new Error('this is user is already registered')
            err.statusCode = 400;
            return next(err)
        }
        await user.save() // save new user to db
        res.status(201).json('User created succesfully')

    } catch (e) {
        return next(e)
    }
}

let login =  async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        const currentDate = new Date().setHours(0,0,0,0)
        if (!user.loggedInDays.find(d => d.getTime() === currentDate)) {
            user.loggedInDays.push(currentDate)
            await user.save()
        }
        res.status(200).json(token)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    register: register,
    login: login
}
