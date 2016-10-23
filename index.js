
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const CookieStrategy = require("passport-cookie");
const path = require("path");
const app = express();

const COOKIE_NAME = "token";
const USER = {
  userid: "UserId",
  username: "Username",
  email: "E-mail"
};

passport.use(new CookieStrategy({ cookieName: COOKIE_NAME }, function(token, next) {
  if (token === "aVwXd7c") {
    return next(null, USER);
  }
  return next(null, false);
}));

passport.serializeUser(function(user, done) {
  done(null, user.userid);
});

passport.deserializeUser(function(id, done) {
  return done(null, USER);
});

app.use(cookieParser());
app.use(passport.initialize());

app.post("/login", (req, res) => {
  res.cookie(COOKIE_NAME, "aVwXd7c").redirect("/profile");
});

app.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME).redirect("/");
});

app.get("/", (req, res, next) => {
  passport.authenticate("cookie", function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.sendFile(path.join(__dirname,"index.html")); }
    return res.redirect("/profile");
  })(req,res,next);
});

app.get("/profile", passport.authenticate("cookie", { session: false, failureRedirect: "/" }), (req, res) => {
  res.sendFile(path.join(__dirname,"profile.html"));
});

app.listen(process.env.PORT || 4000);
