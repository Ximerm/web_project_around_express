const User = require("../models/user");

//GET - Devuelve todos los usuarios
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(500).send({ message: "An error has ocurred on the server" }),
    );
};

//GET - Devuelve usuario por Id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch(() =>
      res.status(500).send({ message: "An error has ocurred on the server" }),
    );
};

//POST - Crea un nuevo usuario
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) =>
      res.status(400).send({
        message: "Invalid user data",
        error: err.message,
      }),
    );
};

// PATCH /users/me - Actualizar perfil
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).send({ message: "Invalid data" });
      if (err.statusCode === 404)
        return res.status(404).send({ message: err.message });
      return res
        .status(500)
        .send({ message: "An error has ocurred on the server" });
    });
};

// PATCH /users/me/avatar - Actualizar avatar
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).send({ message: "Invalid avatar URL" });
      if (err.statusCode === 404)
        return res.status(404).send({ message: err.message });
      return res
        .status(500)
        .send({ message: "An error has ocurred on the server" });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
