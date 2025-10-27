import { unique, chunk, flatten, sum, average } from '../array';

describe('array', () => {
  describe('unique', () => {
    it('应该数组去重', () => {
      expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });
  });

  describe('chunk', () => {
    it('应该分组数组', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
    });
  });

  describe('flatten', () => {
    it('应该扁平化数组', () => {
      expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });
  });

  describe('sum', () => {
    it('应该计算数组总和', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([])).toBe(0);
    });
  });

  describe('average', () => {
    it('应该计算数组平均值', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([])).toBe(0);
    });
  });
});
