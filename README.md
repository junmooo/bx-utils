# bx-utils

一个功能丰富的 JavaScript/TypeScript 工具函数库，提供常用的工具方法，帮助开发者提高开发效率。

## 安装

```bash
npm install bx-utils
```

## 使用方法

```typescript
// ES6 模块导入
import { debounce, throttle, deepClone, validateIdCard } from 'bx-utils';

// CommonJS 导入
const { debounce, throttle, deepClone, validateIdCard } = require('bx-utils');
```

## API 文档

### 性能优化

#### debounce(func, wait, immediate)
防抖函数，在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

**参数:**
- `func` (Function): 要执行的函数
- `wait` (number): 延迟时间（毫秒），默认 300
- `immediate` (boolean): 是否立即执行，默认 false

**返回:** (Function): 防抖后的函数

**示例:**
```typescript
const handleSearch = debounce((value) => {
  console.log('搜索:', value);
}, 500);

// 用户输入时调用
input.addEventListener('input', (e) => handleSearch(e.target.value));
```

#### throttle(func, wait, options)
节流函数，规定在一个单位时间内，只能触发一次函数。

**参数:**
- `func` (Function): 要执行的函数
- `wait` (number): 间隔时间（毫秒），默认 300
- `options` (Object): 配置选项
  - `leading` (boolean): 是否在开始时执行，默认 true
  - `trailing` (boolean): 是否在结束时执行，默认 true

**返回:** (Function): 节流后的函数

**示例:**
```typescript
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);
```

---

### 剪贴板操作

#### copyText(text)
复制文本到剪贴板。

**参数:**
- `text` (string): 要复制的文本

**返回:** Promise<boolean>: 是否复制成功

**示例:**
```typescript
const success = await copyText('Hello World');
if (success) {
  console.log('复制成功');
}
```

#### copyFile(file)
复制文件到剪贴板。

**参数:**
- `file` (File): 要复制的文件对象

**返回:** Promise<boolean>: 是否复制成功

**示例:**
```typescript
const file = new File(['content'], 'example.txt', { type: 'text/plain' });
const success = await copyFile(file);
```

#### readClipboardText()
从剪贴板读取文本。

**返回:** Promise<string>: 剪贴板中的文本

**示例:**
```typescript
const text = await readClipboardText();
console.log('剪贴板内容:', text);
```

---

### 校验工具

#### validateIdCard(idCard)
校验中国身份证号码（支持15位和18位）。

**参数:**
- `idCard` (string): 身份证号码

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validateIdCard('110101199001011234');
console.log('身份证是否有效:', isValid);
```

#### validatePassport(passport)
校验中国护照号码。

**参数:**
- `passport` (string): 护照号码

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validatePassport('E12345678');
console.log('护照是否有效:', isValid);
```

#### validateCreditCode(creditCode)
校验统一社会信用代码。

**参数:**
- `creditCode` (string): 统一社会信用代码

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validateCreditCode('91110000600000000D');
console.log('信用代码是否有效:', isValid);
```

#### validatePhone(phone)
校验中国大陆手机号码。

**参数:**
- `phone` (string): 手机号码

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validatePhone('13800138000');
console.log('手机号是否有效:', isValid);
```

#### validateEmail(email)
校验邮箱地址。

**参数:**
- `email` (string): 邮箱地址

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validateEmail('test@example.com');
console.log('邮箱是否有效:', isValid);
```

#### validateURL(url)
校验URL地址。

**参数:**
- `url` (string): URL地址

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validateURL('https://www.example.com');
console.log('URL是否有效:', isValid);
```

#### validateIPv4(ip)
校验IPv4地址。

**参数:**
- `ip` (string): IP地址

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validateIPv4('192.168.1.1');
console.log('IP地址是否有效:', isValid);
```

#### validateBankCard(cardNumber)
校验银行卡号（使用Luhn算法）。

**参数:**
- `cardNumber` (string): 银行卡号

**返回:** (boolean): 是否有效

**示例:**
```typescript
const isValid = validateBankCard('6222021234567890123');
console.log('银行卡号是否有效:', isValid);
```

---

### 对象操作

#### deepClone(obj)
深拷贝对象，支持Date、RegExp、Map、Set等复杂类型。

**参数:**
- `obj` (any): 要拷贝的对象

**返回:** (any): 拷贝后的对象

**示例:**
```typescript
const original = { a: 1, b: { c: 2 }, d: [3, 4] };
const cloned = deepClone(original);
cloned.b.c = 999;
console.log(original.b.c); // 2，原对象未被修改
```

#### deepMerge(target, ...sources)
深度合并多个对象。

**参数:**
- `target` (Object): 目标对象
- `sources` (Object[]): 源对象

**返回:** (Object): 合并后的对象

**示例:**
```typescript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = deepMerge(obj1, obj2);
console.log(merged); // { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

---

### 日期时间

#### formatDate(date, format)
格式化日期。

**参数:**
- `date` (Date | number): 日期对象或时间戳，默认为当前时间
- `format` (string): 格式字符串，默认 'YYYY-MM-DD HH:mm:ss'
  - YYYY: 年份
  - MM/M: 月份（补零/不补零）
  - DD/D: 日期（补零/不补零）
  - HH/H: 小时（补零/不补零）
  - mm/m: 分钟（补零/不补零）
  - ss/s: 秒（补零/不补零）

**返回:** (string): 格式化后的日期字符串

**示例:**
```typescript
const date = new Date('2024-01-15 08:30:45');
console.log(formatDate(date, 'YYYY-MM-DD')); // '2024-01-15'
console.log(formatDate(date, 'YYYY年MM月DD日 HH:mm')); // '2024年01月15日 08:30'
```

#### timeAgo(date)
相对时间显示（如"5分钟前"）。

**参数:**
- `date` (Date | number): 日期对象或时间戳

**返回:** (string): 相对时间字符串

**示例:**
```typescript
const date = new Date(Date.now() - 5 * 60 * 1000); // 5分钟前
console.log(timeAgo(date)); // '5分钟前'
```

#### daysBetween(date1, date2)
计算两个日期之间的天数。

**参数:**
- `date1` (Date | number): 日期1
- `date2` (Date | number): 日期2

**返回:** (number): 天数

**示例:**
```typescript
const days = daysBetween(new Date('2024-01-01'), new Date('2024-01-10'));
console.log(days); // 9
```

---

### 随机工具

#### randomString(length, chars)
生成随机字符串。

**参数:**
- `length` (number): 字符串长度，默认 8
- `chars` (string): 字符集，默认为数字和大小写字母

**返回:** (string): 随机字符串

**示例:**
```typescript
const str = randomString(16);
console.log(str); // 如 'aB3dE9fG2hI5jK8l'
```

#### uuid()
生成UUID。

**返回:** (string): UUID字符串

**示例:**
```typescript
const id = uuid();
console.log(id); // 如 '550e8400-e29b-41d4-a716-446655440000'
```

#### randomInt(min, max)
生成指定范围内的随机整数。

**参数:**
- `min` (number): 最小值（包含）
- `max` (number): 最大值（包含）

**返回:** (number): 随机整数

**示例:**
```typescript
const num = randomInt(1, 100);
console.log(num); // 1到100之间的随机数
```

#### shuffle(array)
随机打乱数组。

**参数:**
- `array` (Array): 要打乱的数组

**返回:** (Array): 打乱后的新数组

**示例:**
```typescript
const arr = [1, 2, 3, 4, 5];
const shuffled = shuffle(arr);
console.log(shuffled); // 如 [3, 1, 5, 2, 4]
```

---

### 格式化

#### formatFileSize(bytes, decimals)
格式化文件大小。

**参数:**
- `bytes` (number): 字节数
- `decimals` (number): 小数位数，默认 2

**返回:** (string): 格式化后的字符串

**示例:**
```typescript
console.log(formatFileSize(1024)); // '1 KB'
console.log(formatFileSize(1536000)); // '1.46 MB'
```

#### formatNumber(num, separator)
格式化数字，添加千分位分隔符。

**参数:**
- `num` (number): 数字
- `separator` (string): 分隔符，默认为 ','

**返回:** (string): 格式化后的字符串

**示例:**
```typescript
console.log(formatNumber(1234567)); // '1,234,567'
```

#### formatCurrency(amount, decimals, currency)
格式化金额。

**参数:**
- `amount` (number): 金额
- `decimals` (number): 小数位数，默认 2
- `currency` (string): 货币符号，默认 '¥'

**返回:** (string): 格式化后的金额字符串

**示例:**
```typescript
console.log(formatCurrency(12345.6)); // '¥12,345.60'
console.log(formatCurrency(12345.6, 2, '$')); // '$12,345.60'
```

#### numberToChinese(num)
将数字转换为中文大写。

**参数:**
- `num` (number): 数字

**返回:** (string): 中文大写字符串

**示例:**
```typescript
console.log(numberToChinese(12345)); // '壹万贰仟叁佰肆拾伍'
```

---

### 数组操作

#### unique(array)
数组去重。

**参数:**
- `array` (Array): 要去重的数组

**返回:** (Array): 去重后的新数组

**示例:**
```typescript
const arr = [1, 2, 2, 3, 3, 4];
console.log(unique(arr)); // [1, 2, 3, 4]
```

#### chunk(array, size)
数组分组。

**参数:**
- `array` (Array): 要分组的数组
- `size` (number): 每组的大小，默认 1

**返回:** (Array[]): 分组后的二维数组

**示例:**
```typescript
const arr = [1, 2, 3, 4, 5];
console.log(chunk(arr, 2)); // [[1, 2], [3, 4], [5]]
```

#### flatten(array, depth)
数组扁平化。

**参数:**
- `array` (Array): 要扁平化的数组
- `depth` (number): 扁平化深度，默认 Infinity

**返回:** (Array): 扁平化后的数组

**示例:**
```typescript
const arr = [1, [2, [3, [4]]]];
console.log(flatten(arr, 2)); // [1, 2, 3, [4]]
```

#### sum(array)
数组求和。

**参数:**
- `array` (number[]): 数字数组

**返回:** (number): 总和

**示例:**
```typescript
console.log(sum([1, 2, 3, 4, 5])); // 15
```

#### average(array)
数组平均值。

**参数:**
- `array` (number[]): 数字数组

**返回:** (number): 平均值

**示例:**
```typescript
console.log(average([1, 2, 3, 4, 5])); // 3
```

#### max(array) / min(array)
数组最大值 / 最小值。

**参数:**
- `array` (number[]): 数字数组

**返回:** (number): 最大值 / 最小值

**示例:**
```typescript
console.log(max([1, 5, 3, 9, 2])); // 9
console.log(min([1, 5, 3, 9, 2])); // 1
```

#### intersection(...arrays)
数组交集。

**参数:**
- `arrays` (Array[]): 多个数组

**返回:** (Array): 交集数组

**示例:**
```typescript
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
console.log(intersection(arr1, arr2)); // [2, 3]
```

#### union(...arrays)
数组并集。

**参数:**
- `arrays` (Array[]): 多个数组

**返回:** (Array): 并集数组

**示例:**
```typescript
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
console.log(union(arr1, arr2)); // [1, 2, 3, 4, 5]
```

#### difference(array, ...others)
数组差集。

**参数:**
- `array` (Array): 第一个数组
- `others` (Array[]): 其他数组

**返回:** (Array): 差集数组

**示例:**
```typescript
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5];
console.log(difference(arr1, arr2)); // [1, 2]
```

---

### 字符串操作

#### isEmpty(str)
判断字符串是否为空（包括空白字符）。

**参数:**
- `str` (string | null | undefined): 字符串

**返回:** (boolean)

**示例:**
```typescript
console.log(isEmpty('  ')); // true
console.log(isEmpty('hello')); // false
```

#### capitalize(str)
首字母大写。

**参数:**
- `str` (string): 字符串

**返回:** (string): 首字母大写的字符串

**示例:**
```typescript
console.log(capitalize('hello world')); // 'Hello world'
```

#### camelToSnake(str)
驼峰转下划线。

**参数:**
- `str` (string): 驼峰字符串

**返回:** (string): 下划线字符串

**示例:**
```typescript
console.log(camelToSnake('helloWorld')); // 'hello_world'
```

#### snakeToCamel(str)
下划线转驼峰。

**参数:**
- `str` (string): 下划线字符串

**返回:** (string): 驼峰字符串

**示例:**
```typescript
console.log(snakeToCamel('hello_world')); // 'helloWorld'
```

#### truncate(str, length, suffix)
字符串截断。

**参数:**
- `str` (string): 字符串
- `length` (number): 截断长度
- `suffix` (string): 后缀，默认 '...'

**返回:** (string): 截断后的字符串

**示例:**
```typescript
console.log(truncate('Hello World', 5)); // 'Hello...'
```

#### stripHtml(html)
移除HTML标签。

**参数:**
- `html` (string): HTML字符串

**返回:** (string): 纯文本字符串

**示例:**
```typescript
console.log(stripHtml('<p>Hello <b>World</b></p>')); // 'Hello World'
```

#### escapeHtml(str)
转义HTML特殊字符。

**参数:**
- `str` (string): 字符串

**返回:** (string): 转义后的字符串

**示例:**
```typescript
console.log(escapeHtml('<div>')); // '&lt;div&gt;'
```

#### unescapeHtml(str)
反转义HTML特殊字符。

**参数:**
- `str` (string): 字符串

**返回:** (string): 反转义后的字符串

**示例:**
```typescript
console.log(unescapeHtml('&lt;div&gt;')); // '<div>'
```

---

### URL操作

#### getUrlParams(url)
获取URL参数。

**参数:**
- `url` (string): URL字符串，默认为当前页面URL

**返回:** (Object): 参数对象

**示例:**
```typescript
const params = getUrlParams('https://example.com?id=1&name=test');
console.log(params); // { id: '1', name: 'test' }
```

#### setUrlParams(url, params)
设置URL参数。

**参数:**
- `url` (string): URL字符串
- `params` (Object): 参数对象

**返回:** (string): 新的URL字符串

**示例:**
```typescript
const newUrl = setUrlParams('https://example.com', { id: '1', name: 'test' });
console.log(newUrl); // 'https://example.com?id=1&name=test'
```

#### removeUrlParams(url, keys)
移除URL参数。

**参数:**
- `url` (string): URL字符串
- `keys` (string[]): 要移除的参数键名

**返回:** (string): 新的URL字符串

**示例:**
```typescript
const newUrl = removeUrlParams('https://example.com?id=1&name=test', ['name']);
console.log(newUrl); // 'https://example.com?id=1'
```

#### parseUrl(url)
解析URL。

**参数:**
- `url` (string): URL字符串

**返回:** (Object): URL各部分组成的对象

**示例:**
```typescript
const parsed = parseUrl('https://example.com:8080/path?id=1#hash');
console.log(parsed);
// {
//   protocol: 'https:',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path',
//   search: '?id=1',
//   hash: '#hash',
//   origin: 'https://example.com:8080',
//   params: { id: '1' }
// }
```

---

### 存储操作

#### storage.set(key, value, expire)
设置localStorage。

**参数:**
- `key` (string): 键名
- `value` (any): 值
- `expire` (number): 过期时间（毫秒），可选

**示例:**
```typescript
storage.set('user', { name: 'Tom', age: 20 }, 3600000); // 1小时后过期
```

#### storage.get(key)
获取localStorage。

**参数:**
- `key` (string): 键名

**返回:** (any): 值

**示例:**
```typescript
const user = storage.get('user');
console.log(user); // { name: 'Tom', age: 20 }
```

#### storage.remove(key)
移除localStorage。

**参数:**
- `key` (string): 键名

**示例:**
```typescript
storage.remove('user');
```

#### storage.clear()
清空localStorage。

**示例:**
```typescript
storage.clear();
```

#### cookie.set(name, value, days)
设置cookie。

**参数:**
- `name` (string): 名称
- `value` (string): 值
- `days` (number): 有效天数，可选

**示例:**
```typescript
cookie.set('token', 'abc123', 7); // 7天后过期
```

#### cookie.get(name)
获取cookie。

**参数:**
- `name` (string): 名称

**返回:** (string | null): 值

**示例:**
```typescript
const token = cookie.get('token');
```

#### cookie.remove(name)
删除cookie。

**参数:**
- `name` (string): 名称

**示例:**
```typescript
cookie.remove('token');
```

---

### 通用工具

#### getType(value)
获取数据类型。

**参数:**
- `value` (any): 任意值

**返回:** (string): 类型字符串

**示例:**
```typescript
console.log(getType([])); // 'array'
console.log(getType({})); // 'object'
console.log(getType(null)); // 'null'
console.log(getType(new Date())); // 'date'
```

#### isPromise(value)
判断是否为Promise。

**参数:**
- `value` (any): 任意值

**返回:** (boolean)

**示例:**
```typescript
console.log(isPromise(Promise.resolve())); // true
console.log(isPromise({})); // false
```

#### sleep(ms)
休眠函数。

**参数:**
- `ms` (number): 毫秒数

**返回:** (Promise<void>)

**示例:**
```typescript
await sleep(1000); // 暂停1秒
console.log('1秒后执行');
```

#### retry(fn, retries, delay)
重试函数。

**参数:**
- `fn` (Function): 要执行的函数
- `retries` (number): 重试次数，默认 3
- `delay` (number): 重试延迟（毫秒），默认 1000

**返回:** (Promise)

**示例:**
```typescript
const result = await retry(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}, 3, 2000);
```

#### curry(fn)
函数柯里化。

**参数:**
- `fn` (Function): 要柯里化的函数

**返回:** (Function): 柯里化后的函数

**示例:**
```typescript
function add(a, b, c) {
  return a + b + c;
}
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
```

#### compose(...fns)
函数组合（从右到左执行）。

**参数:**
- `fns` (Function[]): 函数数组

**返回:** (Function): 组合后的函数

**示例:**
```typescript
const add1 = (x) => x + 1;
const multiply2 = (x) => x * 2;
const composed = compose(multiply2, add1);
console.log(composed(5)); // 12 (先加1再乘2)
```

#### pipe(...fns)
函数管道（从左到右执行）。

**参数:**
- `fns` (Function[]): 函数数组

**返回:** (Function): 管道函数

**示例:**
```typescript
const add1 = (x) => x + 1;
const multiply2 = (x) => x * 2;
const piped = pipe(add1, multiply2);
console.log(piped(5)); // 12 (先加1再乘2)
```

---

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
