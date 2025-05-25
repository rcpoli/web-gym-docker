const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contacto', (req, res) => {
  // 1) Logueamos el body para ver en los logs del contenedor
  console.log('Contacto entrante:', req.body);

  // 2) Respondemos al frontend
  const { nombre } = req.body;
  return res.json({
    éxito: true,
    mensaje: `¡Gracias ${nombre}, mensaje recibido!`
  });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Backend escuchando en puerto ${PORT}`)
);
