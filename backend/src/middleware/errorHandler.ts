import { Request, Response, NextFunction } from 'express';

// Jadi ini Middleware penangkap error global
// Kalau ada error yang gak ditangkap di controller manapin, larinya ke sini

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err.stack);
  res.status(500).json({ error: 'A server error occurred' });
}

// Middleware untuk route yang gak ketemu
// Kalau request masuk ke URL yang gak ada handlernya, ditangkap disini

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
}
