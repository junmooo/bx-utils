// 性能优化
export { debounce, throttle } from './performance';

// 剪贴板操作
export { copyText, copyFile, readClipboardText } from './clipboard';

// 校验工具
export {
  validateIdCard,
  validatePassport,
  validateCreditCode,
  validatePhone,
  validateEmail,
  validateURL,
  validateIPv4,
  validateBankCard,
} from './validation';

// 对象操作
export { deepClone, deepMerge } from './object';

// 日期时间
export { formatDate, timeAgo, daysBetween } from './date';

// 随机工具
export { randomString, uuid, randomInt, shuffle } from './random';

// 格式化
export {
  formatFileSize,
  formatNumber,
  formatCurrency,
  numberToChinese,
} from './format';

// 数组操作
export {
  unique,
  chunk,
  flatten,
  sum,
  average,
  max,
  min,
  intersection,
  union,
  difference,
} from './array';

// 字符串操作
export {
  isEmpty,
  capitalize,
  camelToSnake,
  snakeToCamel,
  truncate,
  stripHtml,
  escapeHtml,
  unescapeHtml,
} from './string';

// URL操作
export {
  getUrlParams,
  setUrlParams,
  removeUrlParams,
  parseUrl,
} from './url';

// 存储操作
export { storage, cookie } from './storage';

// 通用工具
export {
  getType,
  isPromise,
  sleep,
  retry,
  curry,
  compose,
  pipe,
} from './common';
