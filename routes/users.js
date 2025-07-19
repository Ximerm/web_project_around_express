const router = require("express").Router();
const path = require("path");
const fs = require("fs");

//Lista JSON de todos los usuarios
router.get("/", (req, res) => {
  const usersPath = path.join(__dirname, "..", "data", "users.json");
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "An error has occurred on the server" });
    }
    return res.send(JSON.parse(data));
  });
});

//Lista JSON con un ID que pasamos después de /users.
router.get("/:id", (req, res) => {
  const usersPath = path.join(__dirname, "..", "data", "users.json");
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "An error has occurred on the server" });
    }
    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User ID not found" });
    }
    return res.send(user);
  });
});

module.exports = router;
