const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Review = require('./review')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        validate(value) {
            if (value !== 'admin' && value !== 'user') {
                throw new Error('Role is invalid')
            }            
        }
    },
    loggedInDays: [{        
        type: Date
    }]
})

userSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'user'
})

// generates json web token for a user with usr id in it
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), sub: user }, 'secret')
    return token
}

// finds user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

// hashs the plain text password
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
    // call to execute the save to db
})

// Delete user reviews when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Review.deleteMany({ user: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User