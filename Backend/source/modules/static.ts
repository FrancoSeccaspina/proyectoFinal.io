import express from 'express';

const serveStatic = (folder: string): express.Handler => {
  return express.static(folder);
};

export default serveStatic;
