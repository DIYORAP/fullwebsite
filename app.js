
if(process.env.NODE_ENV!= "production")
  {require('dotenv').config()
  }
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const  listingsRouter= require("./routes/listing.js");
const reviewsRouter= require("./routes/review.js");
const session =require("express-session");
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
const passport=require('passport');
const User=require("./models/user.js");
const LocalStrategy = require("passport-local").Strategy;
const userRouter=require("./routes/user.js");

 
const dburl=process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dburl);
}
main() 
  .then(() => {
    console.log("MongoDb connect");
  })
  .catch((err) => {
    console.log(err);
  });

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.engine("ejs", ejsMate);
  app.use(express.static(path.join(__dirname, "/public")));
  
  //app.get("/", (req, res) => {
  //  res.send("Hi, I am root");
  //});
  
  const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
      secret:"mysupersecretcode"
    },
    touchAfter:24*3600,
  });

  store.on("error",()=>{
    console.log("ERROR In MONGO SESSION STORE",err);
  })

const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+ 7 *24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
}



app.use(session(sessionOptions));
app.use(flash());
//app.use(passport.authorize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



 
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();

});




/*app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "ddiyora12@gmail.com",
    username: "computer-student"
  });
  try {
    let registeredUser = await User.register(fakeUser, "helloworld");
    console.log(registeredUser);
    res.send("registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});*/





app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not found!"));
});


app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Somthing went Wrong!!" } = err;
  res.render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
