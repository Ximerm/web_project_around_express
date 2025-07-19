const express = require("express");
const routeUsers = require("./routes/users");
const routeCards = require("./routes/cards");
const app = express();

// Establecer puerto
const { PORT = 3000 } = process.env;

// Ruta básica
app.get("/", (req, res) => {
  res.send("¡Servidor Express funcionando correctamente!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
