import { exec } from 'child_process';
import os from 'os';

const port: number | string = process.env.PORT || 3032;

const start = (): void => {
  const url = `http://localhost:${port}`;
  console.log(`Servidor corriendo en ${url}`);

  let command: string;
  switch (os.platform()) {
    case 'win32':
      command = `start ${url}`;
      break;
    case 'darwin':
      command = `open ${url}`;
      break;
    case 'linux':
      command = `xdg-open ${url}`;
      break;
    default:
      console.log('No se puede abrir automaticamente el navegador en este sistema operativo');
      return;
  }

  exec(command, (error) => {
    if (error) {
      console.error('No se pudo abrir el navegador:', error);
    }
  });
};

export { port, start };
