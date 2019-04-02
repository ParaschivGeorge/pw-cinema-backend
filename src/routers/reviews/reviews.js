const Review = require('../../models/review')

let createReview = async (req, res, next) => {
    
    const review = new Review(req.body)
    try {
        dbReview = await Review.findOne( {user: review.user, movie: review.movie} )
        if (dbReview) { 
            let err = new Error('this is review already exists')
            err.statusCode = 400;
            return next(err)
        }
        await review.save() // save new review to db
        res.status(201).send(review)

    } catch (e) {
        return next(e)
    }
}

let findAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find(req.query).populate('movie').populate('user').exec()
        
        res.send(reviews)
    } catch (e) {
        res.status(500).send()
    }
}

let findOneReview = async (req, res) => {
    try {
        const review = await Review.findOne({ _id: req.params.id})

        if (!review) {
            return res.status(404).send()
        }

        await review.populate('movie').execPopulate()
        await review.populate('user').execPopulate()

        res.send(review)
    } catch (e) {
        res.status(500).send()
    }
}

let updateReview = async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const review = await Review.findOne({ _id: req.params.id })

        if (!review) {
            return res.status(404).send()
        }

        updates.forEach((update) => review[update] = req.body[update])
        await review.save()
        res.send(review)
    } catch (e) {
        res.status(400).send(e)
    }
}

let deleteReview = async (req, res) => {
    try {
        const review = await Review.remove({ _id: req.params.id }).exec()

        if (!review) {
            res.status(404).send()
        }

        res.send(review)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    createReview: createReview,
    findAllReviews: findAllReviews,
    findOneReview: findOneReview,
    updateReview: updateReview,
    deleteReview: deleteReview
}