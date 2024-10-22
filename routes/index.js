var express = require("express");
var router = express.Router();
const fs = require("fs");
const { title } = require("process");
const { CLIENT_RENEG_LIMIT } = require("tls");

router.get("/", function (req, res, next) {
  fs.readdir("./uploads", function (err, files) {
    res.render("Home", { files: files });
  });

  router.get("/created", function (req, res, next) {
    fs.writeFile(
      `./uploads/${req.query.title}`,
      req.query.details,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      }
    );
  });
});
router.get("/newnote", function (req, res, next) {
  res.render("newnote");
});

router.get("/show/:filename", function (req, res, next) {
  fs.readFile(`./uploads/${req.params.filename}`, "utf8", function (err, data) {
    res.send(data);
  });
});
router.get("/edit/:filename", function (req, res, next) {
  const Note = req.params.filename;
  fs.readFile(`./uploads/${req.params.filename}`, "utf8", function (err, data) {

    res.render("edit", { title: Note, data: data })
  })
});

router.get("/new-created/:Oldtitle", function (req, res, next) {
  const OldTitle = req.params.Oldtitle;
  const newTitle = req.query.title;
  const newDetails = req.query.details;

  fs.rename(`./uploads/${OldTitle}`, `./uploads/${newTitle}`, function (err) {
    fs.writeFile(`./uploads/${newTitle}`, newDetails, function (err) {
      if (err) throw err;
      else {
        res.redirect("/");
      }
    })
  })
})
router.get("/delete/:filename", function (req, res, next) {
  fs.unlink(`./uploads/${req.params.filename}`, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;
