/**
 * @jest-environment jsdom
 */
import { copyText, copyFile, readClipboardText } from '../clipboard';

describe('clipboard', () => {
  describe('copyText', () => {
    it('应该导出 copyText 函数', () => {
      expect(typeof copyText).toBe('function');
    });

    it('应该返回 Promise', () => {
      const result = copyText('test');
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('copyFile', () => {
    it('应该导出 copyFile 函数', () => {
      expect(typeof copyFile).toBe('function');
    });
  });

  describe('readClipboardText', () => {
    it('应该导出 readClipboardText 函数', () => {
      expect(typeof readClipboardText).toBe('function');
    });

    it('应该返回 Promise', () => {
      const result = readClipboardText();
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
