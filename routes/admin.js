const express = require("express");
const router = express.Router();
const News = require("../models/models");

router.all("*", (req, res, next) =>
  !req.session.admin ? res.redirect("/login") : next()
);

/* GET home page. */
// Wyświetlanie zawartości bazy danych
router.get("/", (req, res) => {
  News.find({}, (err, data) => {
    data.forEach(d => {
      const date = new Date(d.date);
      d.dd = `${date.getDay() < 10 ? "0" + date.getDate() : date.getDate()}-${
        date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
      }-${date.getFullYear()}`;
    });
    console.log(data);
    // console.log(data);
    return res.render("admin/index", { title: "Admin", data });
  });
});

/* Router do dodawania newsów */
router.get("/news/add", (req, res) =>
  res.render("admin/news", { title: "Dodaj news", body: {} })
);

// Zapisuwanie rekordów do bazy danych wraz ze wstepną walidacją danych
router.post("/news/add", (req, res) => {
  const body = req.body;
  console.log(body);
  const newsData = new News(body);
  const errors = newsData.validateSync();

  newsData.save(err => {
    if (err) {
      return res.render("admin/news", { title: "Dodaj news", errors, body });
    }

    res.redirect("/admin");
  });
});

router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, err => {
    console.log(err);
  });
  res.redirect("/admin");
});

module.exports = router;
