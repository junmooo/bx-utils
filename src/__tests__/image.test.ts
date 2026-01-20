import { compressImage } from '../image';

// Mock canvas
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  drawImage: jest.fn(),
})) as jest.Mock;

HTMLCanvasElement.prototype.toBlob = jest.fn(
  (callback: BlobCallback, type?: string, quality?: number) => {
    // 模拟返回一个 Blob
    const blob = new Blob(['mock image data'], { type: type || 'image/jpeg' });
    setTimeout(() => callback(blob), 0);
  },
) as jest.Mock;

describe('compressImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock URL.createObjectURL
    URL.createObjectURL = jest.fn(() => 'blob:mock-url');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('应该返回一个 Promise', () => {
    const file = new File(['mock data'], 'test.jpg', { type: 'image/jpeg' });
    const result = compressImage(file);
    expect(result).toBeInstanceOf(Promise);
  });

  it('应该返回压缩后的 File 对象', async () => {
    const file = new File(['mock data'], 'test.jpg', { type: 'image/jpeg' });

    // Mock Image
    const mockImage = new Image();
    const imageConstructor = jest.fn(() => mockImage);
    global.Image = imageConstructor as any;

    // 模拟 Image 加载完成
    setTimeout(() => {
      mockImage.onload?.call(mockImage, new Event('load'));
    }, 0);

    const result = await compressImage(file);

    expect(result).toBeInstanceOf(File);
    expect(result.name).toBe('test.jpg');
  });

  it('应该接受自定义的最大文件大小', async () => {
    const file = new File(['mock data'], 'test.jpg', { type: 'image/jpeg' });

    const mockImage = new Image();
    const imageConstructor = jest.fn(() => mockImage);
    global.Image = imageConstructor as any;

    setTimeout(() => {
      mockImage.onload?.call(mockImage, new Event('load'));
    }, 0);

    const result = await compressImage(file, 2);

    expect(result).toBeInstanceOf(File);
  });

  it('当图像加载失败时应该返回原文件', async () => {
    const file = new File(['mock data'], 'test.jpg', { type: 'image/jpeg' });

    const mockImage = new Image();
    const imageConstructor = jest.fn(() => mockImage);
    global.Image = imageConstructor as any;

    // 模拟图像加载失败
    setTimeout(() => {
      mockImage.onerror?.call(mockImage, new Event('error'));
    }, 0);

    const result = await compressImage(file);

    expect(result).toBe(file);
  });

  it('当 canvas.getContext 返回 null 时应该返回原文件', async () => {
    const file = new File(['mock data'], 'test.jpg', { type: 'image/jpeg' });

    // Mock getContext 返回 null
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null) as jest.Mock;

    const result = await compressImage(file);

    expect(result).toBe(file);
  });
});
