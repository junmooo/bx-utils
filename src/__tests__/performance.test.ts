import { debounce, throttle } from '../performance';

describe('performance', () => {
  jest.useFakeTimers();

  describe('debounce', () => {
    it('应该在延迟后执行函数', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 500);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该在多次调用后只执行一次', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('immediate=true 时应该立即执行', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300, true);

      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('应该在指定时间间隔内最多执行一次', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn();
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});
