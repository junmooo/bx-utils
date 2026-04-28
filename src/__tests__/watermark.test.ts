/**
 * @jest-environment jsdom
 */

import JsBarcode from 'jsbarcode';
import {
  createBarcodeWatermarkTile,
  drawWatermarkToCanvas,
  injectWatermark,
  removeWatermark,
  revealWatermark,
  type BarcodeWatermarkTileOptions,
} from '../watermark';

jest.mock('jsbarcode', () => jest.fn());

const mockedJsBarcode = jest.mocked(JsBarcode);
const originalGetContext = HTMLCanvasElement.prototype.getContext;
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
const originalImage = global.Image;
const originalImageData = global.ImageData;

function createMockCanvasContext() {
  return {
    clearRect: jest.fn(),
    save: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    drawImage: jest.fn(),
    restore: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 120 })),
    createPattern: jest.fn(() => ({} as CanvasPattern)),
    fillRect: jest.fn(),
    putImageData: jest.fn(),
    getImageData: jest.fn(
      () =>
        new ImageData(
          new Uint8ClampedArray([
            20, 40, 60, 255,
            80, 100, 120, 255,
            140, 160, 180, 255,
            200, 220, 240, 255,
          ]),
          2,
          2,
        )
    ),
    font: '',
    fillStyle: '',
    globalAlpha: 1,
    textAlign: 'center' as CanvasTextAlign,
    textBaseline: 'middle' as CanvasTextBaseline,
  };
}

const barcodeOptions: BarcodeWatermarkTileOptions = {
  type: 'barcode',
  text: '1234567890',
  opacity: 0.25,
  angle: -20,
  gapX: 16,
  gapY: 24,
  color: '#222222',
};

beforeEach(() => {
  jest.clearAllMocks();

  class MockImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;

    constructor(data: Uint8ClampedArray, width: number, height: number);
    constructor(width: number, height: number);
    constructor(
      dataOrWidth: Uint8ClampedArray | number,
      widthOrHeight: number,
      maybeHeight?: number
    ) {
      if (typeof dataOrWidth === 'number') {
        this.width = dataOrWidth;
        this.height = widthOrHeight;
        this.data = new Uint8ClampedArray(this.width * this.height * 4);
        return;
      }

      this.data = dataOrWidth;
      this.width = widthOrHeight;
      this.height = maybeHeight ?? 0;
    }
  }

  global.ImageData = MockImageData as unknown as typeof ImageData;

  mockedJsBarcode.mockImplementation((canvas: SVGElement | HTMLCanvasElement | HTMLImageElement) => {
    if (canvas instanceof HTMLCanvasElement) {
      canvas.width = 120;
      canvas.height = 48;
    }

    return canvas;
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: jest.fn(() => createMockCanvasContext() as unknown as CanvasRenderingContext2D),
    configurable: true,
    writable: true,
  });

  HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,mock');

  class MockImage {
    naturalWidth = 2;
    naturalHeight = 2;
    onload: ((event: Event) => void) | null = null;
    onerror: ((event: Event) => void) | null = null;

    set src(_: string) {
      setTimeout(() => {
        this.onload?.(new Event('load'));
      }, 0);
    }
  }

  global.Image = MockImage as unknown as typeof Image;
});

afterEach(() => {
  removeWatermark();
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: originalGetContext,
    configurable: true,
    writable: true,
  });
  HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
  global.Image = originalImage;
  global.ImageData = originalImageData;
});

describe('watermark', () => {
  it('应该生成条形码水印 tile', () => {
    const tile = createBarcodeWatermarkTile(barcodeOptions);

    expect(mockedJsBarcode).toHaveBeenCalledWith(
      expect.any(HTMLCanvasElement),
      '1234567890',
      expect.objectContaining({
        format: 'CODE128',
        lineColor: '#222222',
        width: 1,
        height: 40,
        displayValue: true,
        fontSize: 14,
      })
    );
    expect(tile.width).toBe(136);
    expect(tile.height).toBe(72);
  });

  it('应该将条形码水印平铺到目标 canvas', () => {
    const target = document.createElement('canvas');
    const targetContext = createMockCanvasContext();

    Object.defineProperty(target, 'getContext', {
      value: jest.fn(() => targetContext as unknown as CanvasRenderingContext2D),
      configurable: true,
    });

    drawWatermarkToCanvas(target, 320, 180, barcodeOptions);

    expect(target.width).toBe(320);
    expect(target.height).toBe(180);
    expect(targetContext.createPattern).toHaveBeenCalledWith(
      expect.objectContaining({ width: 136, height: 72 }),
      'repeat'
    );
    expect(targetContext.fillRect).toHaveBeenCalledWith(0, 0, 320, 180);
  });

  it('应该支持注入和移除条形码水印', () => {
    injectWatermark({
      ...barcodeOptions,
      antiDelete: true,
    });

    const watermarkElement = document.getElementById('__stealth_wm__');

    expect(watermarkElement).not.toBeNull();
    expect(watermarkElement?.querySelector('canvas')).not.toBeNull();

    removeWatermark();

    expect(document.getElementById('__stealth_wm__')).toBeNull();
  });

  it.each(['amplify', 'stretch'] as const)('应该支持 %s 方式还原水印', async (method) => {
    const result = await revealWatermark('data:image/png;base64,mock', { method });

    expect(result).toBe('data:image/png;base64,mock');
  });
});