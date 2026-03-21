const User = require("../models/user");

//GET - Devuelve todos los usuarios
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(500).send({ message: "Error al obtener usuarios" }),
    );
};

//GET - Devuelve usuario por Id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Error al buscar usuario" }));
};

//POST - Crea un nuevo usuario
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) =>
      res.status(400).send({
        message: "Datos inválidos para crear un usuario",
        error: err.message,
      }),
    );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
