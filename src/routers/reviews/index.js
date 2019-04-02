const ReviewsRouter = require("express").Router()

const createReview = require('./reviews').createReview
const updateReview = require('./reviews').updateReview
const findAllReviews = require('./reviews').findAllReviews
const findOneReview = require('./reviews').findOneReview
const deleteReview = require('./reviews').deleteReview

ReviewsRouter.post('', createReview)
ReviewsRouter.put('/:id', updateReview)
ReviewsRouter.get('', findAllReviews)
ReviewsRouter.get('/:id', findOneReview)
ReviewsRouter.delete('/:id', deleteReview)

module.exports = ReviewsRouter