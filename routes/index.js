var express = require("express");
var router = express.Router();
const fs = require("fs");

router.get("/", function (req, res, next) {
  fs.readdir("./uploads",function (err, files) {
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
router.get("/show/delete/:filename", function (req, res, next) {
  fs.unlink(`./uploads/${req.params.filename}`, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    } 
  });
});


module.exports = router;
