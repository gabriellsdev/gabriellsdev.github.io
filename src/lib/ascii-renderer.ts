export type AsciiMode = 'characters' | 'dither' | 'dots';

export interface AsciiOptions {
  mode: AsciiMode;
  cellSize: number;
  contrast: number; // 0.5 to 2.0 (default 1.1)
  brightness: number; // -50 to +50 (default 0)
  invert: boolean;
  charSet: string;
  tintColor: string; // e.g. '#e5e0d8' or '#d4af37'
  glowColor?: string;
  density: number; // 0.2 to 1.0
  animateAmbient?: boolean;
}

export const DEFAULT_ASCII_OPTIONS: AsciiOptions = {
  mode: 'characters',
  cellSize: 7,
  contrast: 1.15,
  brightness: 10,
  invert: false,
  charSet: ' .:-=+*#%@',
  tintColor: '#e5e0d8',
  glowColor: 'rgba(212, 175, 55, 0.2)',
  density: 0.9,
  animateAmbient: false,
};

// 4x4 Bayer Dithering Matrix for 'dither' mode
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export class AsciiEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;
  private image: HTMLImageElement | null = null;
  private options: AsciiOptions;
  private isDestroyed = false;
  private animFrameId: number | null = null;
  private animTime = 0;

  constructor(canvas: HTMLCanvasElement, options?: Partial<AsciiOptions>) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context not available');
    }
    this.ctx = context;

    this.offscreenCanvas = document.createElement('canvas');
    const offContext = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
    if (!offContext) {
      throw new Error('Offscreen 2D context not available');
    }
    this.offscreenCtx = offContext;

    this.options = { ...DEFAULT_ASCII_OPTIONS, ...options };
  }

  public updateOptions(newOptions: Partial<AsciiOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.render();
  }

  public loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (this.isDestroyed) return;
        this.image = img;
        this.render();
        resolve();
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = src;
    });
  }

  public resize(width: number, height: number): void {
    if (this.isDestroyed || width <= 0 || height <= 0) return;
    this.canvas.width = width;
    this.canvas.height = height;
    this.render();
  }

  public startAnimation(): void {
    if (this.animFrameId !== null) return;

    const loop = () => {
      if (this.isDestroyed) return;
      this.animTime += 0.05;
      this.render();
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  public stopAnimation(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  public render(): void {
    if (this.isDestroyed || !this.image) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    if (width === 0 || height === 0) return;

    const {
      cellSize,
      contrast,
      brightness,
      invert,
      charSet,
      tintColor,
      glowColor,
      mode,
      density,
      animateAmbient,
    } = this.options;

    // Number of cells in grid
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    if (cols <= 0 || rows <= 0) return;

    // Set offscreen canvas to sample resolution
    this.offscreenCanvas.width = cols;
    this.offscreenCanvas.height = rows;

    // Draw source scaled down into offscreen canvas
    this.offscreenCtx.drawImage(this.image, 0, 0, cols, rows);

    let imageData: ImageData;
    try {
      imageData = this.offscreenCtx.getImageData(0, 0, cols, rows);
    } catch {
      // In case of CORS fallback, draw original image directly on canvas
      this.ctx.drawImage(this.image, 0, 0, width, height);
      return;
    }

    const pixels = imageData.data;

    // Prepare main canvas
    this.ctx.fillStyle = '#050507';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.font = `${cellSize}px 'Courier New', Courier, monospace`;
    this.ctx.textBaseline = 'top';

    const charLen = charSet.length;
    const waveShift = animateAmbient ? Math.sin(this.animTime) * 0.1 : 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Stochastic skip based on density
        if (density < 1.0 && Math.random() > density) {
          continue;
        }

        const idx = (r * cols + c) * 4;
        let red = pixels[idx];
        let green = pixels[idx + 1];
        let blue = pixels[idx + 2];

        // Apply brightness
        red += brightness;
        green += brightness;
        blue += brightness;

        // Apply contrast: (color - 128) * contrast + 128
        red = (red - 128) * contrast + 128;
        green = (green - 128) * contrast + 128;
        blue = (blue - 128) * contrast + 128;

        // Clamp
        red = Math.min(255, Math.max(0, red));
        green = Math.min(255, Math.max(0, green));
        blue = Math.min(255, Math.max(0, blue));

        // ITU-R BT.709 perceived luminance
        let lum = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        let normalized = lum / 255;

        if (invert) {
          normalized = 1 - normalized;
        }

        // Slight ambient wave ripple
        if (waveShift !== 0) {
          normalized = Math.min(1, Math.max(0, normalized + Math.sin(r * 0.2 + this.animTime) * 0.08));
        }

        const x = c * cellSize;
        const y = r * cellSize;

        if (mode === 'characters') {
          const charIndex = Math.floor(normalized * (charLen - 1));
          const char = charSet[charIndex];
          if (char && char !== ' ') {
            // Apply slight glow to brightest highlights
            if (glowColor && normalized > 0.85) {
              this.ctx.shadowColor = glowColor;
              this.ctx.shadowBlur = 4;
            } else {
              this.ctx.shadowBlur = 0;
            }

            this.ctx.fillStyle = tintColor;
            this.ctx.fillText(char, x, y);
          }
        } else if (mode === 'dither') {
          // Bayer threshold comparison
          const bayerThreshold = (BAYER_4X4[r % 4][c % 4] + 0.5) / 16;
          if (normalized > bayerThreshold) {
            this.ctx.fillStyle = tintColor;
            this.ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
          }
        } else if (mode === 'dots') {
          // Halftone dot
          if (normalized > 0.05) {
            const radius = (normalized * cellSize) / 2;
            this.ctx.fillStyle = tintColor;
            this.ctx.beginPath();
            this.ctx.arc(x + cellSize / 2, y + cellSize / 2, radius, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
      }
    }

    // Reset shadow blur
    this.ctx.shadowBlur = 0;
  }

  public destroy(): void {
    this.isDestroyed = true;
    this.stopAnimation();
    this.image = null;
  }
}
