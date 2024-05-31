const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
//const {storage}=require("../cloudConfig.js")
//const upload = multer({ storage })

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, wrapAsync(listingController.createListings));
    //.post(upload.single("listing[image]"),(req,res)=>{
   // res.send(req.file);
  
  //new Route
  router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
  });
  
router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListings));


//Show Route
//<!-- -
// Create Route
// validate listing error avtti atle baki rakhel

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
