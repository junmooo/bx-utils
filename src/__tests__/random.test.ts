import { randomString, uuid, randomInt, shuffle } from '../random';

describe('random', () => {
  describe('randomString', () => {
    it('应该生成指定长度的随机字符串', () => {
      const str = randomString(16);
      expect(str).toHaveLength(16);
    });

    it('应该使用默认长度', () => {
      const str = randomString();
      expect(str).toHaveLength(8);
    });

    it('应该只包含指定字符', () => {
      const chars = 'ABC';
      const str = randomString(100, chars);
      expect(str).toMatch(/^[ABC]+$/);
    });

    it('每次生成的字符串应该不同', () => {
      const str1 = randomString(16);
      const str2 = randomString(16);
      expect(str1).not.toBe(str2);
    });
  });

  describe('uuid', () => {
    it('应该生成UUID格式的字符串', () => {
      const id = uuid();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    it('每次生成的UUID应该不同', () => {
      const id1 = uuid();
      const id2 = uuid();
      expect(id1).not.toBe(id2);
    });
  });

  describe('randomInt', () => {
    it('应该生成指定范围内的整数', () => {
      const num = randomInt(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
      expect(Number.isInteger(num)).toBe(true);
    });

    it('应该包含边界值', () => {
      const results = new Set();
      for (let i = 0; i < 1000; i++) {
        results.add(randomInt(1, 2));
      }
      expect(results.has(1)).toBe(true);
      expect(results.has(2)).toBe(true);
    });
  });

  describe('shuffle', () => {
    it('应该打乱数组', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled).toHaveLength(arr.length);
      expect(shuffled.sort()).toEqual(arr);
    });

    it('不应该修改原数组', () => {
      const arr = [1, 2, 3, 4, 5];
      const original = [...arr];
      shuffle(arr);
      expect(arr).toEqual(original);
    });
  });
});
