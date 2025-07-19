const router = require("express").Router();
const path = require("path");
const fs = require("fs");

//Lista JSON de todas las tarjetas
router.get("/", (req, res) => {
  const cardsPath = path.join(__dirname, "..", "data", "cards.json");
  fs.readFile(cardsPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "An error has occurred on the server" });
    }
    return res.send(JSON.parse(data));
  });
});

module.exports = router;
