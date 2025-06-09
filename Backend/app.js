const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/contacto", (req, res) => {
  const contacto = req.body;
  console.log("Contacto entrante:", contacto);
  res.status(200).json({ mensaje: "Información de contacto recibida" });
});

// Solo iniciar el servidor si no estamos en pruebas
if (process.env.NODE_ENV !== 'test') {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`🚀 Backend escuchando en puerto ${PORT}`));
}

module.exports = app;
