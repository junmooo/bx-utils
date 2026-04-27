/**
 * 压缩图片
 * @param file 图片文件对象
 * @param maxSize 压缩目标大小（MB），默认为 4
 * @returns 返回压缩后的 File 对象
 */
export const compressImage = (
  file: File,
  maxSize: number = 4,
): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(file);
      return;
    }

    const img = new Image();

    img.onload = () => {
      // 计算压缩后的尺寸
      let { width, height } = img;
      const maxWidth = 2560;
      const maxHeight = 2560;

      // 如果图片尺寸过大，先缩小尺寸
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // 绘制图片到canvas
      ctx.drawImage(img, 0, 0, width, height);

      // 递归压缩直到文件大小满足要求
      const compress = (quality: number = 0.8): void => {
        // 为了更有效的压缩，将PNG转换为JPEG
        const mimeType = file.type === 'image/png' ? 'image/jpeg' : file.type;
        
        canvas.toBlob(
          (blob: Blob | null) => {
            if (!blob) {
              resolve(file);
              return;
            }

            const size = blob.size / 1024 / 1024; // MB

            if (size <= maxSize || quality <= 0.1) {
              // 创建新的File对象
              const fileName = file.name.replace(/\.png$/i, '.jpg');
              const compressedFile = new File([blob], fileName, {
                type: mimeType,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              // 继续压缩，降低质量
              compress(quality - 0.1);
            }
          },
          mimeType,
          quality,
        );
      };

      compress();
    };

    img.onerror = () => {
      // 图片加载失败，返回原文件
      resolve(file);
    };

    img.src = URL.createObjectURL(file);
  });
};
