const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken =process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.rendernewfrom = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing does not exist!");
    res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListings = async (req, res, next) => {
  let response =await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
    .send();
   
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  newListing.geomertry=response.body.features[0].geometry;

  let saved=await newListing.save();
  console.log(saved)
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing  does not exist!");
    res.redirect("/listings");
  }
  req.flash("success", "Listing edited!");
  res.render("listings/edit.ejs", { listing });
};
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};
module.exports.deleteListings = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", " Listing Deleted!");
  console.log(deletedListing);
  res.redirect("/listings");
};
