const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController=require("../controllers/user.js")
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",saveRedirectUrl,
  wrapAsync(userController.signUp)
);

router.get("/login", userController.rendersignup);

router.post(
  "/login",saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout",userController.logout );

module.exports = router;
