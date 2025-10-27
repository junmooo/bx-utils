import { deepClone, deepMerge } from '../object';

describe('object', () => {
  describe('deepClone', () => {
    it('应该深拷贝简单对象', () => {
      const obj = { a: 1, b: 2 };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
    });

    it('应该深拷贝嵌套对象', () => {
      const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
      const cloned = deepClone(obj);
      cloned.b.c = 999;
      expect(obj.b.c).toBe(2);
    });

    it('应该深拷贝数组', () => {
      const arr: (number | number[])[] = [1, 2, [3, 4]];
      const cloned = deepClone(arr);
      (cloned[2] as number[])[0] = 999;
      expect((arr[2] as number[])[0]).toBe(3);
    });

    it('应该拷贝Date对象', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);
      expect(cloned.getTime()).toBe(date.getTime());
      expect(cloned).not.toBe(date);
    });
  });

  describe('deepMerge', () => {
    it('应该合并简单对象', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 3, c: 4 };
      const merged = deepMerge(obj1, obj2);
      expect(merged).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('应该深度合并嵌套对象', () => {
      const obj1: any = { a: 1, b: { c: 2 } };
      const obj2: any = { b: { d: 3 }, e: 4 };
      const merged = deepMerge(obj1, obj2);
      expect(merged).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });
  });
});
