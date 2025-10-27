import { getType, isPromise, sleep, retry, curry, compose, pipe } from '../common';

describe('common', () => {
  describe('getType', () => {
    it('应该获取正确的数据类型', () => {
      expect(getType([])).toBe('array');
      expect(getType({})).toBe('object');
      expect(getType('')).toBe('string');
      expect(getType(123)).toBe('number');
      expect(getType(true)).toBe('boolean');
      expect(getType(null)).toBe('null');
      expect(getType(undefined)).toBe('undefined');
      expect(getType(new Date())).toBe('date');
      expect(getType(/test/)).toBe('regexp');
    });
  });

  describe('isPromise', () => {
    it('应该判断是否为Promise', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
    });

    it('应该判断非Promise对象', () => {
      expect(isPromise({})).toBe(false);
      expect(isPromise(null)).toBe(false);
      expect(isPromise(123)).toBe(false);
    });
  });

  describe('sleep', () => {
    it('应该返回Promise', () => {
      const result = sleep(100);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('retry', () => {
    it('应该在成功时返回结果', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const result = await retry(fn, 3, 0);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('应该在重试次数用完后抛出错误', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('fail'));
      await expect(retry(fn, 0, 0)).rejects.toThrow('fail');
      expect(fn).toHaveBeenCalledTimes(1); // 只执行初始调用
    });
  });

  describe('curry', () => {
    it('应该柯里化函数', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curry(add);

      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
      expect(curriedAdd(1, 2, 3)).toBe(6);
    });
  });

  describe('compose', () => {
    it('应该从右到左组合函数', () => {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const composed = compose(multiply2, add1);

      expect(composed(5)).toBe(12); // (5 + 1) * 2 = 12
    });
  });

  describe('pipe', () => {
    it('应该从左到右组合函数', () => {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const piped = pipe(add1, multiply2);

      expect(piped(5)).toBe(12); // (5 + 1) * 2 = 12
    });
  });
});
