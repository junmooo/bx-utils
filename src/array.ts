/**
 * 数组去重
 * @param array 要去重的数组
 * @returns 去重后的新数组
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * 数组分组
 * @param array 要分组的数组
 * @param size 每组的大小
 * @returns 分组后的二维数组
 */
export function chunk<T>(array: T[], size: number = 1): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * 数组扁平化
 * @param array 要扁平化的数组
 * @param depth 扁平化深度，默认为无限深
 * @returns 扁平化后的数组
 */
export function flatten<T>(array: any[], depth: number = Infinity): T[] {
  if (depth <= 0) return array;

  return array.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
  }, []);
}

/**
 * 数组求和
 * @param array 数字数组
 * @returns 总和
 */
export function sum(array: number[]): number {
  return array.reduce((acc, val) => acc + val, 0);
}

/**
 * 数组平均值
 * @param array 数字数组
 * @returns 平均值
 */
export function average(array: number[]): number {
  return array.length > 0 ? sum(array) / array.length : 0;
}

/**
 * 数组最大值
 * @param array 数字数组
 * @returns 最大值
 */
export function max(array: number[]): number {
  return Math.max(...array);
}

/**
 * 数组最小值
 * @param array 数字数组
 * @returns 最小值
 */
export function min(array: number[]): number {
  return Math.min(...array);
}

/**
 * 数组交集
 * @param arrays 多个数组
 * @returns 交集数组
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];

  return arrays.reduce((acc, array) => {
    return acc.filter((item) => array.includes(item));
  });
}

/**
 * 数组并集
 * @param arrays 多个数组
 * @returns 并集数组
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat());
}

/**
 * 数组差集
 * @param array 第一个数组
 * @param others 其他数组
 * @returns 差集数组
 */
export function difference<T>(array: T[], ...others: T[][]): T[] {
  const otherSet = new Set(others.flat());
  return array.filter((item) => !otherSet.has(item));
}
