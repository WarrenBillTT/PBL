export interface RGB {
  r: number;
  g: number;
  b: number;
}

interface CMY {
  c: number;
  m: number;
  y: number;
}

export interface ColorInput {
  hex: string;
  ratio: number;
}

export interface MixResult {
  resultHex: string;
  resultRgb: RGB;
}

const HEX_PATTERN = /^#?[0-9A-Fa-f]{6}$/;

export function isValidHex(hex: string): boolean {
  return HEX_PATTERN.test(hex);
}

export function hexToRgb(hex: string): RGB {
  if (!isValidHex(hex)) {
    throw new Error(`Format hex not valid: ${hex}`);
  }
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToCmy({ r, g, b }: RGB): CMY {
  return { c: 1 - r / 255, m: 1 - g / 255, y: 1 - b / 255 };
}

function cmyToRgb({ c, m, y }: CMY): RGB {
  return { r: (1 - c) * 255, g: (1 - m) * 255, b: (1 - y) * 255 };
}

/**
 * Mixing 2 sampai 5 warna menggunakan metode subtractive CMY, yang lebih
 * how pigment mixes in real life much better than a plain RGB biasanya.
 */
export function mixColors(colors: ColorInput[]): MixResult {
  if (!Array.isArray(colors)) {
    throw new Error('Colors must be an array');
  }
  if (colors.length < 2 || colors.length > 5) {
    throw new Error('The number of colors must be between 2 and 5');
  }

  const totalRatio = colors.reduce((sum, c) => sum + c.ratio, 0);
  if (Math.round(totalRatio) !== 100) {
    throw new Error('Total ratio must 100%');
  }

  let mixedCmy: CMY = { c: 0, m: 0, y: 0 };

  for (const { hex, ratio } of colors) {
    if (ratio <= 0) {
      throw new Error('Ratio must be more than 0');
    }
    const cmy = rgbToCmy(hexToRgb(hex));
    const weight = ratio / 100;
    mixedCmy.c += cmy.c * weight;
    mixedCmy.m += cmy.m * weight;
    mixedCmy.y += cmy.y * weight;
  }

  const resultRgb = cmyToRgb(mixedCmy);
  return { resultHex: rgbToHex(resultRgb), resultRgb };
}
