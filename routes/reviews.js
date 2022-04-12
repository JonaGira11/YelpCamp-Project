const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../ultis/catchAsync');
const ExpressError = require('../ultis/ExpressError');
const reviews = require('../controllers/reviews')
const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')


// where we send our reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

//where we delete our reviews
router.delete('/:reviewId', isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
