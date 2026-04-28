/**
 * watermark.ts — 暗水印工具库
 * 提供水印生成、页面注入（含 MutationObserver 防删除）、水印还原五种算法
 */

import JsBarcode from 'jsbarcode';

export type WatermarkType = 'text' | 'barcode';

interface BaseWatermarkTileOptions {
  text: string;
  opacity: number;
  angle: number;
  gapX: number;
  gapY: number;
  type?: WatermarkType;
}

export interface TextWatermarkTileOptions extends BaseWatermarkTileOptions {
  type?: 'text';
  fontSize: number;
  color: string;
}

export interface BarcodeWatermarkTileOptions extends BaseWatermarkTileOptions {
  type: 'barcode';
  format?: string;
  lineColor?: string;
  barWidth?: number;
  barHeight?: number;
  displayValue?: boolean;
  fontSize?: number;
  color?: string;
}

export type WatermarkTileOptions = TextWatermarkTileOptions | BarcodeWatermarkTileOptions;

export type InjectWatermarkOptions =
  | (TextWatermarkTileOptions & { antiDelete?: boolean })
  | (BarcodeWatermarkTileOptions & { antiDelete?: boolean });

export type RevealBackgroundType = 'bright' | 'dark';

export interface RevealWatermarkOptions {
  method?: RevealMethod;
  grayscale?: boolean;
  amplify?: number;
  blockSize?: number;
  blurRadius?: number;
  contrast?: number;
  brightness?: number;
  bgType?: RevealBackgroundType;
  lowP?: number;
  highP?: number;
}

export type RevealMethod = 'multiscale' | 'highfreq' | 'amplify' | 'stretch' | 'filter';

function get2dContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas 2D context is not supported in the current environment.');
  }

  return context;
}

/* ═══════════════════════════════════════════
   Section 1 · 水印生成
═══════════════════════════════════════════ */

function isBarcodeWatermarkOptions(
  options: WatermarkTileOptions | InjectWatermarkOptions
): options is BarcodeWatermarkTileOptions {
  return options.type === 'barcode';
}

/**
 * 生成单块条形码水印 Canvas Tile
 */
export function createBarcodeWatermarkTile({
  text,
  format = 'CODE128',
  lineColor,
  barWidth = 1,
  barHeight = 40,
  displayValue = true,
  fontSize = 14,
  opacity,
  angle,
  color,
  gapX,
  gapY,
}: BarcodeWatermarkTileOptions): HTMLCanvasElement {
  const barcodeCanvas = document.createElement('canvas');
  const resolvedLineColor = lineColor ?? color ?? '#000';

  JsBarcode(barcodeCanvas, text, {
    format,
    lineColor: resolvedLineColor,
    width: barWidth,
    height: barHeight,
    displayValue,
    fontSize,
    textAlign: 'center',
    margin: 0,
  });

  const barcodeWidth = barcodeCanvas.width;
  const barcodeHeight = barcodeCanvas.height;

  const canvas = document.createElement('canvas');
  canvas.width = barcodeWidth + gapX;
  canvas.height = barcodeHeight + gapY;

  const context = get2dContext(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((angle * Math.PI) / 180);
  context.globalAlpha = opacity;
  context.drawImage(barcodeCanvas, -barcodeWidth / 2, -barcodeHeight / 2);
  context.restore();

  return canvas;
}

/**
 * 生成单块水印 Canvas Tile
 */
export function createWatermarkTile({
  text,
  fontSize,
  opacity,
  angle,
  color,
  gapX,
  gapY,
}: TextWatermarkTileOptions): HTMLCanvasElement {
  const lines = text.split('\n');
  const probe = document.createElement('canvas');
  const probeContext = get2dContext(probe);

  probeContext.font = `${fontSize}px "IBM Plex Mono", monospace`;

  const maxWidth = Math.max(...lines.map((line) => probeContext.measureText(line).width));
  const lineHeight = fontSize * 1.45;
  const textHeight = lines.length * lineHeight;

  const canvas = document.createElement('canvas');
  canvas.width = maxWidth + gapX;
  canvas.height = textHeight + gapY;

  const context = get2dContext(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((angle * Math.PI) / 180);
  context.font = `${fontSize}px "IBM Plex Mono", monospace`;
  context.fillStyle = color;
  context.globalAlpha = opacity;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  lines.forEach((line, index) => {
    const y = (index - (lines.length - 1) / 2) * lineHeight;
    context.fillText(line, 0, y);
  });

  context.restore();
  return canvas;
}

function createWatermarkTileCanvas(options: WatermarkTileOptions): HTMLCanvasElement {
  return isBarcodeWatermarkOptions(options)
    ? createBarcodeWatermarkTile(options)
    : createWatermarkTile(options);
}

/**
 * 将水印 tile 平铺绘制到目标 Canvas
 */
export function drawWatermarkToCanvas(
  target: HTMLCanvasElement,
  width: number,
  height: number,
  options: WatermarkTileOptions
): void {
  target.width = width;
  target.height = height;

  const context = get2dContext(target);
  context.clearRect(0, 0, width, height);

  const tile = createWatermarkTileCanvas(options);
  const pattern = context.createPattern(tile, 'repeat');

  if (!pattern) {
    throw new Error('Failed to create watermark pattern.');
  }

  context.fillStyle = pattern;
  context.fillRect(0, 0, width, height);
}

/* ═══════════════════════════════════════════
   Section 2 · 页面水印注入 & 防删除
═══════════════════════════════════════════ */

const WM_ID = '__stealth_wm__';

let watermarkObserver: MutationObserver | null = null;
let watermarkElement: HTMLDivElement | null = null;
let watermarkOptions: InjectWatermarkOptions | null = null;

/**
 * 构建水印 DOM 节点（fixed 全屏覆盖层）
 */
function buildWatermarkEl(options: WatermarkTileOptions): HTMLDivElement {
  const element = document.createElement('div');
  element.id = WM_ID;

  Object.assign(element.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '99999',
  });

  const canvas = document.createElement('canvas');
  drawWatermarkToCanvas(canvas, window.innerWidth, window.innerHeight, options);

  Object.assign(canvas.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
  });

  element.appendChild(canvas);
  return element;
}

/**
 * 注入全屏水印
 */
export function injectWatermark(options: InjectWatermarkOptions): void {
  watermarkOptions = options;
  removeWatermark();

  const nextWatermarkElement = buildWatermarkEl(options);
  watermarkElement = nextWatermarkElement;
  document.body.appendChild(nextWatermarkElement);

  if (options.antiDelete) {
    startAntiDelete();
  }

  window.addEventListener('resize', handleResize);
}

/**
 * 移除全屏水印并清理副作用
 */
export function removeWatermark(): void {
  stopAntiDelete();

  if (watermarkElement) {
    watermarkElement.remove();
    watermarkElement = null;
  }

  window.removeEventListener('resize', handleResize);
}

function handleResize(): void {
  if (!watermarkElement || !watermarkOptions) {
    return;
  }

  const canvas = watermarkElement.querySelector('canvas');

  if (canvas instanceof HTMLCanvasElement) {
    drawWatermarkToCanvas(canvas, window.innerWidth, window.innerHeight, watermarkOptions);
  }
}

function startAntiDelete(): void {
  stopAntiDelete();

  watermarkObserver = new MutationObserver(() => {
    if (watermarkOptions && !document.getElementById(WM_ID)) {
      console.warn('[Watermark] 节点被删除，已自动恢复。');

      const nextWatermarkElement = buildWatermarkEl(watermarkOptions);
      watermarkElement = nextWatermarkElement;
      document.body.appendChild(nextWatermarkElement);
    }
  });

  watermarkObserver.observe(document.body, { childList: true });
}

function stopAntiDelete(): void {
  if (watermarkObserver) {
    watermarkObserver.disconnect();
    watermarkObserver = null;
  }
}

/* ═══════════════════════════════════════════
   Section 3 · 水印还原算法
═══════════════════════════════════════════ */

/**
 * 加载图片文件为 HTMLImageElement
 */
function loadImage(file: Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = file instanceof Blob ? URL.createObjectURL(file) : null;
    const imageSource = typeof file === 'string' ? file : objectUrl;

    image.onload = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      resolve(image);
    };

    image.onerror = (event) => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      reject(event);
    };

    if (!imageSource) {
      reject(new Error('Failed to resolve image source.'));
      return;
    }

    image.src = imageSource;
  });
}

/**
 * 从 Image 获取 ImageData + 尺寸
 */
function getImageData(image: HTMLImageElement): { w: number; h: number; data: ImageData } {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = get2dContext(canvas);
  context.drawImage(image, 0, 0);

  return {
    w: canvas.width,
    h: canvas.height,
    data: context.getImageData(0, 0, canvas.width, canvas.height),
  };
}

/**
 * ImageData → PNG dataURL
 */
function toDataURL(imageData: ImageData, width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = get2dContext(canvas);
  context.putImageData(imageData, 0, 0);

  return canvas.toDataURL('image/png');
}

const clamp = (value: number): number => Math.max(0, Math.min(255, value));

/**
 * 灰度化（原地修改）
 */
function applyGrayscale(imageData: ImageData): void {
  const data = imageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const grayscaleValue =
      0.299 * data[index] +
      0.587 * data[index + 1] +
      0.114 * data[index + 2];

    data[index] = grayscaleValue;
    data[index + 1] = grayscaleValue;
    data[index + 2] = grayscaleValue;
  }
}

/* ── 算法 1: 块均值高频 ── */
function revealMultiscale(
  imageData: ImageData,
  width: number,
  height: number,
  { amplify = 40, blockSize = 16 }: RevealWatermarkOptions
): ImageData {
  const source = imageData.data;
  const output = new ImageData(width, height);
  const data = output.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const blockXStart = Math.max(0, x - (blockSize >> 1));
      const blockYStart = Math.max(0, y - (blockSize >> 1));
      const blockXEnd = Math.min(width, blockXStart + blockSize);
      const blockYEnd = Math.min(height, blockYStart + blockSize);

      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let count = 0;

      for (let blockY = blockYStart; blockY < blockYEnd; blockY++) {
        for (let blockX = blockXStart; blockX < blockXEnd; blockX++) {
          const blockIndex = (blockY * width + blockX) * 4;
          sumR += source[blockIndex];
          sumG += source[blockIndex + 1];
          sumB += source[blockIndex + 2];
          count++;
        }
      }

      const pixelIndex = (y * width + x) * 4;
      data[pixelIndex] = clamp(128 + (source[pixelIndex] - sumR / count) * amplify);
      data[pixelIndex + 1] = clamp(128 + (source[pixelIndex + 1] - sumG / count) * amplify);
      data[pixelIndex + 2] = clamp(128 + (source[pixelIndex + 2] - sumB / count) * amplify);
      data[pixelIndex + 3] = 255;
    }
  }

  return output;
}

/* ── 算法 2: 高频分离（Box Blur 低通 + 差值放大） ── */
function boxBlur(source: Uint8ClampedArray, width: number, height: number, radius: number): Uint8ClampedArray {
  const temp = new Uint8ClampedArray(source.length);
  const output = new Uint8ClampedArray(source.length);
  const kernelSize = 2 * radius + 1;

  for (let y = 0; y < height; y++) {
    for (let channel = 0; channel < 3; channel++) {
      let sum = 0;

      for (let x = 0; x < kernelSize; x++) {
        sum += source[(y * width + Math.min(x, width - 1)) * 4 + channel];
      }

      for (let x = 0; x < width; x++) {
        temp[(y * width + x) * 4 + channel] = sum / kernelSize;

        const xIn = x + radius + 1;
        const xOut = x - radius;

        sum += source[(y * width + Math.min(xIn, width - 1)) * 4 + channel];
        sum -= source[(y * width + Math.max(xOut, 0)) * 4 + channel];
      }
    }
  }

  for (let x = 0; x < width; x++) {
    for (let channel = 0; channel < 3; channel++) {
      let sum = 0;

      for (let y = 0; y < kernelSize; y++) {
        sum += temp[(Math.min(y, height - 1) * width + x) * 4 + channel];
      }

      for (let y = 0; y < height; y++) {
        output[(y * width + x) * 4 + channel] = sum / kernelSize;

        const yIn = y + radius + 1;
        const yOut = y - radius;

        sum += temp[(Math.min(yIn, height - 1) * width + x) * 4 + channel];
        sum -= temp[(Math.max(yOut, 0) * width + x) * 4 + channel];
      }
    }
  }

  for (let index = 0; index < width * height; index++) {
    output[index * 4 + 3] = source[index * 4 + 3];
  }

  return output;
}

function revealHighFreq(
  imageData: ImageData,
  width: number,
  height: number,
  { amplify = 40, blurRadius = 3 }: RevealWatermarkOptions
): ImageData {
  const source = imageData.data;
  const blurred = boxBlur(source, width, height, blurRadius);
  const output = new ImageData(width, height);
  const data = output.data;

  for (let index = 0; index < width * height; index++) {
    const pixelIndex = index * 4;
    data[pixelIndex] = clamp(128 + (source[pixelIndex] - blurred[pixelIndex]) * amplify);
    data[pixelIndex + 1] = clamp(128 + (source[pixelIndex + 1] - blurred[pixelIndex + 1]) * amplify);
    data[pixelIndex + 2] = clamp(128 + (source[pixelIndex + 2] - blurred[pixelIndex + 2]) * amplify);
    data[pixelIndex + 3] = 255;
  }

  return output;
}

/* ── 算法 3: 偏差放大（纯色背景专用） ── */
function revealAmplify(
  imageData: ImageData,
  width: number,
  height: number,
  { amplify = 40, bgType = 'bright' }: RevealWatermarkOptions
): ImageData {
  const source = imageData.data;
  const output = new ImageData(width, height);
  const data = output.data;
  const base = bgType === 'bright' ? 255 : 0;

  for (let index = 0; index < width * height; index++) {
    const pixelIndex = index * 4;
    data[pixelIndex] = clamp(128 + (source[pixelIndex] - base) * amplify);
    data[pixelIndex + 1] = clamp(128 + (source[pixelIndex + 1] - base) * amplify);
    data[pixelIndex + 2] = clamp(128 + (source[pixelIndex + 2] - base) * amplify);
    data[pixelIndex + 3] = 255;
  }

  return output;
}

/* ── 算法 4: 分位数拉伸 ── */
function revealStretch(
  imageData: ImageData,
  width: number,
  height: number,
  { lowP = 1, highP = 99 }: RevealWatermarkOptions
): ImageData {
  const source = imageData.data;
  const output = new ImageData(width, height);
  const data = output.data;
  const pixelCount = width * height;

  for (let channel = 0; channel < 3; channel++) {
    const values = new Float32Array(pixelCount);

    for (let index = 0; index < pixelCount; index++) {
      values[index] = source[index * 4 + channel];
    }

    const sorted = Float32Array.from(values).sort();
    const lowIndex = Math.min(pixelCount - 1, Math.max(0, Math.floor((pixelCount * lowP) / 100)));
    const highIndex = Math.min(pixelCount - 1, Math.max(0, Math.floor((pixelCount * highP) / 100)));
    const lowValue = sorted[lowIndex];
    const highValue = sorted[highIndex];
    const range = highValue - lowValue || 1;

    for (let index = 0; index < pixelCount; index++) {
      data[index * 4 + channel] = clamp(((values[index] - lowValue) / range) * 255);
    }
  }

  for (let index = 0; index < pixelCount; index++) {
    data[index * 4 + 3] = 255;
  }

  return output;
}

/* ── 算法 5: 对比度/亮度拉伸 ── */
function revealFilter(
  imageData: ImageData,
  width: number,
  height: number,
  { contrast = 15, brightness = 0.5 }: RevealWatermarkOptions
): ImageData {
  const source = imageData.data;
  const output = new ImageData(width, height);
  const data = output.data;

  for (let index = 0; index < width * height; index++) {
    const pixelIndex = index * 4;

    for (let channel = 0; channel < 3; channel++) {
      data[pixelIndex + channel] = clamp(
        (source[pixelIndex + channel] * brightness - 128) * contrast + 128
      );
    }

    data[pixelIndex + 3] = 255;
  }

  return output;
}

/**
 * 水印还原主函数
 */
export async function revealWatermark(
  file: Blob | string,
  options: RevealWatermarkOptions = {}
): Promise<string> {
  const image = await loadImage(file);
  const { w, h, data } = getImageData(image);

  let result: ImageData;

  switch (options.method) {
    case 'highfreq':
      result = revealHighFreq(data, w, h, options);
      break;
    case 'amplify':
      result = revealAmplify(data, w, h, options);
      break;
    case 'stretch':
      result = revealStretch(data, w, h, options);
      break;
    case 'filter':
      result = revealFilter(data, w, h, options);
      break;
    default:
      result = revealMultiscale(data, w, h, options);
      break;
  }

  if (options.grayscale) {
    applyGrayscale(result);
  }

  return toDataURL(result, w, h);
}