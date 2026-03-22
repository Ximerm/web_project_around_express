const Card = require("../models/card");

// GET - Devuelve todas las tarjetas
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() =>
      res.status(500).send({ message: "An error has ocurred on the server" }),
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
        return res.status(400).send({ message: "Invalid card data" });
      }
      return res
        .status(500)
        .send({ message: "An error has ocurred on the server" });
    });
};

// DELETE - Elimina una tarjeta por Id
const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({
          message: "Not authorized to delete this card",
        });
      }
      return Card.findByIdAndDelete(req.params.cardId).then(() =>
        res.send({ message: "Card deleted" }),
      );
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid card id" });
      }
      return res
        .status(500)
        .send({ message: "An error has ocurred on the server" });
    });
};

// PUT -/cards/:cardId/likes — Dar like a una tarjeta
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid car id" });
      }
      return res
        .status(500)
        .send({ message: "An error has ocurred on the server" });
    });
};

// DELETE LIKE /cards/:cardId/likes — Dar unlike a una tarjeta
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid card id" });
      }
      return res
        .status(500)
        .send({ message: "An error has ocurred on the server" });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
