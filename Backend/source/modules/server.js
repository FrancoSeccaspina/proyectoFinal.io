const port = process.env.PORT || 3032 ;
const start = () => console.log('servidor corriendo...');

module.exports = { port, start }
/*const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '../../public')));

// Ruta para /usuarios
app.get('/usuarios', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/