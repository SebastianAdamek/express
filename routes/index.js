const express = require("express");
const router = express.Router();
const login = "sebastian";
const pass = "123";

/* GET home page. */
router.get("/", (req, res) => res.render("index", { title: "Express" }));

router.get("/login", (req, res) => {
  if (req.session.admin) return res.redirect("/admin");
  res.render("login", { title: "Logowanie" });
});

router.post("/login", (req, res) => {
  const body = req.body;
  if (body.password === pass && body.login === login) {
    req.session.admin = 1;
    res.redirect("/admin");
  }
  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.session.admin = undefined;
  res.redirect("/");
});

module.exports = router;
