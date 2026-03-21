const Card = require("../models/card");

// GET - Devuelve todas las tarjetas
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() =>
      res
        .status(500)
        .send({ message: "Error del servidor al obtener tarjetas" }),
    );
};

// POST - Crea una nueva tarjeta
const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log("req.user._id =>", req.user._id);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Datos de tarjeta no válidos" });
      }
      return res
        .status(500)
        .send({ message: "Error del servidor al crear tarjeta" });
    });
};

// DELETE - Elimina una tarjeta por Id
const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .send({ message: "No autorizado para eliminar esta tarjeta" });
      }
      return Card.findByIdAndDelete(req.params.cardId).then(() =>
        res.send({ message: "Tarjeta eliminada" }),
      );
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta inválido" });
      }
      return res
        .status(500)
        .send({ message: "Error del servidor al eliminar tarjeta" });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
