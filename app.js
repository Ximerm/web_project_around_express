const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Establecer puerto
const { PORT = 3000 } = process.env;

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "users.json"))
);
const cards = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "cards.json"))
);

// Ruta básica
app.get("/", (req, res) => {
  res.send("¡Servidor Express funcionando correctamente!");
});

app.get("/users", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(users);
});

app.get("/cards", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(cards);
});

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
