const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");
const User = require("./models/user");
require("dotenv").config();

//db set up
async function connectToMongoDB() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.CONN);
}
connectToMongoDB().catch((err) => console.log(err));

//start express
const app = express();

//middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

//passportjwt set up
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const strategyOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
const authFunction = async function (jwtPayload, done) {
  const authUser = await User.findById(jwtPayload.userId, "-password ");
  if (authUser) {
    return done(null, authUser);
  } else {
    return done(error);
  }
};

//set strategy
passport.use(new JWTStrategy(strategyOpts, authFunction));

//routes
app.use("/posts", postRouter);
app.use("/users", userRouter);

//catch unexpected routes
app.use(function (req, res, next) {
  next(createError(404));
});

//error handling middleware
app.use(function (err, req, res, next) {
  return res.status(err.status || 500).json({
    error: {
      message: err.message,
      stack: req.app.get("env") === "development" ? err.stack : "",
    },
  });
});

module.exports = app;
