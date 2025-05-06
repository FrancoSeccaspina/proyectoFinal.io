import { Request, Response, NextFunction } from "express";

export default function rutaNoEncontrada(req: Request, res: Response, next: NextFunction) {
  res.status(404).render("error", {
    title: "Página no encontrada",
    code: 404,
    message: "Página no encontrada",
    description: `La URL "${req.originalUrl}" no existe en el servidor.`
  });
}
