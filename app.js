const express = require("express");
//Conectar a mongoose
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");

const app = express();
app.use(express.json());

//Middleware para la autorización temporal
app.use((req, res, next) => {
  req.user = {
    _id: "69be05942d8934edb58a8a92",
  };

  next();
});

// Establecer puerto
const { PORT = 3000 } = process.env;

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

//Base de datos mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// Ruta básica
app.get("/", (req, res) => {
  res.send("¡Servidor Express funcionando correctamente!");
});

app.get("/cards", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(cards);
});

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
