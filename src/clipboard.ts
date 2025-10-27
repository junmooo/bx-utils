/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // 降级方案：使用 execCommand
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
}

/**
 * 复制文件到剪贴板
 * @param file 要复制的文件
 * @returns Promise<boolean> 是否复制成功
 */
export async function copyFile(file: File): Promise<boolean> {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) {
      console.error('当前浏览器不支持复制文件');
      return false;
    }

    const clipboardItem = new ClipboardItem({
      [file.type]: file,
    });

    await navigator.clipboard.write([clipboardItem]);
    return true;
  } catch (error) {
    console.error('复制文件失败:', error);
    return false;
  }
}

/**
 * 从剪贴板读取文本
 * @returns Promise<string> 剪贴板中的文本
 */
export async function readClipboardText(): Promise<string> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return await navigator.clipboard.readText();
    }
    throw new Error('不支持读取剪贴板');
  } catch (error) {
    console.error('读取剪贴板失败:', error);
    return '';
  }
}
