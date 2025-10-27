/**
 * bx-utils 使用示例
 */

import {
  debounce,
  throttle,
  copyText,
  validateIdCard,
  validatePhone,
  validateEmail,
  deepClone,
  formatDate,
  randomString,
  uuid,
  formatFileSize,
  formatCurrency,
  unique,
  chunk,
  isEmpty,
  capitalize,
  storage,
  cookie,
  sleep,
  retry,
} from '../src/index';

// ===== 性能优化示例 =====
console.log('===== 性能优化示例 =====');

// 防抖示例
const searchHandler = debounce((keyword: string) => {
  console.log('搜索:', keyword);
}, 500);

// 模拟用户输入
searchHandler('he');
searchHandler('hel');
searchHandler('hello'); // 只有这次会执行

// 节流示例
const scrollHandler = throttle(() => {
  console.log('滚动事件触发');
}, 1000);

// ===== 剪贴板操作示例 =====
console.log('\n===== 剪贴板操作示例 =====');
async function clipboardDemo() {
  const success = await copyText('Hello bx-utils!');
  console.log('复制结果:', success);
}

// ===== 校验工具示例 =====
console.log('\n===== 校验工具示例 =====');
console.log('身份证校验:', validateIdCard('11010119900101001X'));
console.log('手机号校验:', validatePhone('13800138000'));
console.log('邮箱校验:', validateEmail('test@example.com'));

// ===== 对象操作示例 =====
console.log('\n===== 对象操作示例 =====');
const original = {
  name: 'Tom',
  age: 20,
  address: {
    city: 'Beijing',
    street: 'Chang\'an Ave',
  },
  hobbies: ['reading', 'coding'],
};

const cloned = deepClone(original);
cloned.address.city = 'Shanghai';
console.log('原对象:', original.address.city); // Beijing
console.log('克隆对象:', cloned.address.city); // Shanghai

// ===== 日期时间示例 =====
console.log('\n===== 日期时间示例 =====');
const now = new Date();
console.log('格式化日期:', formatDate(now, 'YYYY-MM-DD HH:mm:ss'));
console.log('格式化日期:', formatDate(now, 'YYYY年MM月DD日'));

// ===== 随机工具示例 =====
console.log('\n===== 随机工具示例 =====');
console.log('随机字符串:', randomString(16));
console.log('UUID:', uuid());

// ===== 格式化示例 =====
console.log('\n===== 格式化示例 =====');
console.log('文件大小:', formatFileSize(1536000)); // 1.46 MB
console.log('金额格式:', formatCurrency(12345.67)); // ¥12,345.67

// ===== 数组操作示例 =====
console.log('\n===== 数组操作示例 =====');
console.log('数组去重:', unique([1, 2, 2, 3, 3, 4])); // [1, 2, 3, 4]
console.log('数组分组:', chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]

// ===== 字符串操作示例 =====
console.log('\n===== 字符串操作示例 =====');
console.log('判断空字符串:', isEmpty('  ')); // true
console.log('首字母大写:', capitalize('hello world')); // Hello world

// ===== 存储操作示例 =====
console.log('\n===== 存储操作示例 =====');
// 设置带过期时间的 localStorage
storage.set('user', { name: 'Tom', age: 20 }, 3600000); // 1小时后过期
console.log('获取存储:', storage.get('user'));

// 设置 cookie
cookie.set('token', 'abc123', 7); // 7天后过期

// ===== 通用工具示例 =====
console.log('\n===== 通用工具示例 =====');
async function retryDemo() {
  let count = 0;
  const result = await retry(
    async () => {
      count++;
      console.log(`尝试第 ${count} 次`);
      if (count < 3) {
        throw new Error('失败');
      }
      return '成功';
    },
    3,
    1000
  );
  console.log('重试结果:', result);
}

// 运行示例
clipboardDemo();
retryDemo();

export default {
  searchHandler,
  scrollHandler,
  clipboardDemo,
  original,
  cloned,
  retryDemo,
};
