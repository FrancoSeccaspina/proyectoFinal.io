const port: number | string = process.env.PORT || 3032;

const start = (): void => {
  console.log('servidor corriendo...');
  console.log('http://localhost:3032');
};

export { port, start };

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