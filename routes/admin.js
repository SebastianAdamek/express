const express = require("express");
const router = express.Router();
const News = require("../models/models");

router.all("*", (req, res, next) =>
  !req.session.admin ? res.redirect("/login") : next()
);

/* GET home page. */
router.get("/", (req, res) => res.render("admin/index", { title: "Admin" }));

/* Router do dodawania newsów */
router.get("/news/add", (req, res) =>
  res.render("admin/news", { title: "Dodaj news" })
);

router.post("/news/add", (req, res) => {
  const newsData = new News(req.body);

  newsData.save(err => console.log(err));

  res.redirect("/admin");
});

module.exports = router;
