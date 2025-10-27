import { formatFileSize, formatNumber, formatCurrency, numberToChinese } from '../format';

describe('format', () => {
  describe('formatFileSize', () => {
    it('应该格式化字节数', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1536000)).toBe('1.46 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });

    it('应该使用指定的小数位数', () => {
      expect(formatFileSize(1536000, 1)).toBe('1.5 MB');
      expect(formatFileSize(1536000, 3)).toBe('1.465 MB');
    });
  });

  describe('formatNumber', () => {
    it('应该添加千分位分隔符', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(999)).toBe('999');
    });

    it('应该使用自定义分隔符', () => {
      expect(formatNumber(1234567, ' ')).toBe('1 234 567');
      expect(formatNumber(1234567, '.')).toBe('1.234.567');
    });
  });

  describe('formatCurrency', () => {
    it('应该格式化金额', () => {
      expect(formatCurrency(12345.67)).toBe('¥12,345.67');
      expect(formatCurrency(1000)).toBe('¥1,000.00');
    });

    it('应该使用指定的小数位数', () => {
      expect(formatCurrency(12345.6, 0)).toBe('¥12,346');
      expect(formatCurrency(12345.6, 1)).toBe('¥12,345.6');
    });

    it('应该使用自定义货币符号', () => {
      expect(formatCurrency(12345.67, 2, '$')).toBe('$12,345.67');
      expect(formatCurrency(12345.67, 2, '€')).toBe('€12,345.67');
    });
  });

  describe('numberToChinese', () => {
    it('应该转换数字为中文大写', () => {
      expect(numberToChinese(0)).toBe('零');
      expect(numberToChinese(12345)).toBe('壹万贰仟叁佰肆拾伍');
      expect(numberToChinese(1000)).toBe('壹仟');
      expect(numberToChinese(10000)).toBe('壹万');
    });

    it('应该处理负数', () => {
      const result = numberToChinese(-123);
      expect(result).toContain('负');
    });
  });
});
