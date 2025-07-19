import { exec } from 'child_process';
import os from 'os';

const port: number | string = process.env.PORT || 3032;

// NOTA : Automatico/ se abre solo cada vez que se reinicia el servidor
const start = (): void => {
  const url = `http://localhost:${port}`;
  console.log(`Servidor corriendo en ${url}`);
};

export { port, start };
