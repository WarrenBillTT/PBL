import { Request, Response } from 'express';
import { mixColors, ColorInput } from '../utils/colorMixer';

// Ini itu adalah Handler untuk POST /api/mix
// Tahapannya ambil array warna dari request lalu return ke JSON
// Kemudian kalau input tidak valid, throw error dan menjadi response 400

export const mixColorsHandler = (req: Request, res: Response): void => {
  try {
    const colors: ColorInput[] = req.body.colors;
    const result = mixColors(colors);
    res.json({ ...result, colors });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
};