import { formatDate, timeAgo, daysBetween } from '../date';

describe('date', () => {
  describe('formatDate', () => {
    it('应该格式化日期为 YYYY-MM-DD', () => {
      const date = new Date('2024-01-15T08:30:45');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    it('应该格式化日期为 YYYY-MM-DD HH:mm:ss', () => {
      const date = new Date('2024-01-15T08:30:45');
      const result = formatDate(date, 'YYYY-MM-DD HH:mm:ss');
      expect(result).toContain('2024-01-15');
      expect(result).toContain('08:30:45');
    });

    it('应该处理时间戳', () => {
      const timestamp = new Date('2024-01-15').getTime();
      const result = formatDate(timestamp, 'YYYY-MM-DD');
      expect(result).toBe('2024-01-15');
    });

    it('应该使用默认格式', () => {
      const date = new Date('2024-01-15T08:30:45');
      const result = formatDate(date);
      expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });
  });

  describe('timeAgo', () => {
    it('应该显示"刚刚"', () => {
      const now = new Date();
      expect(timeAgo(now)).toBe('刚刚');
    });

    it('应该显示"X分钟前"', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      expect(timeAgo(date)).toBe('5分钟前');
    });

    it('应该显示"X小时前"', () => {
      const date = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe('2小时前');
    });

    it('应该显示"X天前"', () => {
      const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      expect(timeAgo(date)).toBe('3天前');
    });
  });

  describe('daysBetween', () => {
    it('应该计算两个日期之间的天数', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-10');
      expect(daysBetween(date1, date2)).toBe(9);
    });

    it('应该返回绝对值', () => {
      const date1 = new Date('2024-01-10');
      const date2 = new Date('2024-01-01');
      expect(daysBetween(date1, date2)).toBe(9);
    });

    it('应该处理时间戳', () => {
      const timestamp1 = new Date('2024-01-01').getTime();
      const timestamp2 = new Date('2024-01-05').getTime();
      expect(daysBetween(timestamp1, timestamp2)).toBe(4);
    });
  });
});
