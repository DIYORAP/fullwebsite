const Listing = require("../models/listing.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");


module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};
module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  // Update the listing by pulling the reviewId from the reviews array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete the review
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "review Deleted!");
  // Respond with success message or redirect
  res.redirect(`/listings/${id}`);
};
