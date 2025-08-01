import {PORT} from '../configEnv';

const port: number | string = PORT || 3032;

const start = (): void => {
  const url = `http://localhost:${port}`;
  console.log(`Servidor corriendo en ${url}`);
};

export { port, start };
