
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const CookieStrategy = require("passport-cookie");
const path = require("path");
const app = express();

const COOKIE_NAME = "token";

passport.use(new CookieStrategy({ cookieName: COOKIE_NAME }, function(token, next) {
  if (token === "aVwXd7c") {
    return next(null, {
      userid: "UserId",
      username: "Username",
      email: "E-mail"
    });
  }
  return next(null, false);
}));

app.use(cookieParser());
app.use(passport.initialize());

app.post("/login", (req, res) => {
  res.cookie(COOKIE_NAME, "aVwXd7c").redirect("/profile");
});

app.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME).redirect("/");
});

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname,"index.html"));
});

app.get("/profile", passport.authenticate("cookie", { session: false }), (req, res) => {
  res.sendfile(path.join(__dirname,"profile.html"));
});

app.listen(process.env.PORT || 4000);
