const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const router = express.Router({ mergeParams: true }); 


const reviewController=require("../controllers/reviews.js")

router.post(
    "/",
    validateReview,isLoggedIn,
    wrapAsync(reviewController.createReview)
  );
  
  router.delete(
    "/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
  );
  module.exports=router
  