/**
 * 获取数据类型
 * @param value 任意值
 * @returns 类型字符串，如 'string', 'array', 'object'
 */
export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * 判断是否为Promise
 * @param value 任意值
 * @returns boolean
 */
export function isPromise(value: any): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  );
}

/**
 * 休眠函数
 * @param ms 毫秒数
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 重试函数
 * @param fn 要执行的函数
 * @param retries 重试次数
 * @param delay 重试延迟（毫秒）
 * @returns Promise
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay);
  }
}

/**
 * 函数柯里化
 * @param fn 要柯里化的函数
 * @returns 柯里化后的函数
 */
export function curry<T extends (...args: any[]) => any>(fn: T) {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    } else {
      return function (...args2: any[]) {
        return curried.apply(null, args.concat(args2));
      };
    }
  };
}

/**
 * 函数组合
 * @param fns 函数数组
 * @returns 组合后的函数
 */
export function compose<T>(...fns: Array<(arg: T) => T>) {
  return function (value: T) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

/**
 * 函数管道
 * @param fns 函数数组
 * @returns 管道函数
 */
export function pipe<T>(...fns: Array<(arg: T) => T>) {
  return function (value: T) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

/**
 * [非空判断] 空字符串、null、undefined、空对象、空数组均视为“空”
 * @param {*} val 
 */
export const isEmpty = (val: unknown) => {
  return val === '' || val === null || val === undefined || JSON.stringify(val) === '{}' || (Array.isArray(val) && val.length === 0);
};