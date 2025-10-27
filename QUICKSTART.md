# 快速开始

## 安装

```bash
npm install bx-utils
```

## 基础使用

### 1. 防抖和节流

```typescript
import { debounce, throttle } from 'bx-utils';

// 防抖：用户停止输入500ms后才执行搜索
const handleSearch = debounce((keyword: string) => {
  console.log('搜索:', keyword);
}, 500);

// 节流：滚动事件每1秒最多触发一次
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 1000);
```

### 2. 数据校验

```typescript
import { validateIdCard, validatePhone, validateEmail } from 'bx-utils';

// 身份证校验
const isValidIdCard = validateIdCard('11010119900101001X');

// 手机号校验
const isValidPhone = validatePhone('13800138000');

// 邮箱校验
const isValidEmail = validateEmail('test@example.com');
```

### 3. 剪贴板操作

```typescript
import { copyText, readClipboardText } from 'bx-utils';

// 复制文本
const success = await copyText('Hello World');
if (success) {
  console.log('复制成功');
}

// 读取剪贴板
const text = await readClipboardText();
console.log('剪贴板内容:', text);
```

### 4. 深拷贝

```typescript
import { deepClone } from 'bx-utils';

const original = {
  name: 'Tom',
  age: 20,
  address: {
    city: 'Beijing'
  }
};

const cloned = deepClone(original);
cloned.address.city = 'Shanghai';

console.log(original.address.city); // 'Beijing' - 原对象未改变
console.log(cloned.address.city); // 'Shanghai'
```

### 5. 日期格式化

```typescript
import { formatDate, timeAgo } from 'bx-utils';

// 格式化日期
const dateStr = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
console.log(dateStr); // '2024-01-15 14:30:00'

// 相对时间
const relative = timeAgo(new Date(Date.now() - 5 * 60 * 1000));
console.log(relative); // '5分钟前'
```

### 6. 数组操作

```typescript
import { unique, chunk, sum, average } from 'bx-utils';

// 数组去重
console.log(unique([1, 2, 2, 3, 3])); // [1, 2, 3]

// 数组分组
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]

// 数组求和
console.log(sum([1, 2, 3, 4, 5])); // 15

// 数组平均值
console.log(average([1, 2, 3, 4, 5])); // 3
```

### 7. 格式化工具

```typescript
import { formatFileSize, formatCurrency, formatNumber } from 'bx-utils';

// 文件大小格式化
console.log(formatFileSize(1536000)); // '1.46 MB'

// 金额格式化
console.log(formatCurrency(12345.67)); // '¥12,345.67'

// 数字千分位
console.log(formatNumber(1234567)); // '1,234,567'
```

### 8. 随机工具

```typescript
import { randomString, uuid, randomInt, shuffle } from 'bx-utils';

// 随机字符串
console.log(randomString(16)); // 如 'aB3dE9fG2hI5jK8l'

// UUID
console.log(uuid()); // '550e8400-e29b-41d4-a716-446655440000'

// 随机整数
console.log(randomInt(1, 100)); // 1-100之间的随机数

// 打乱数组
console.log(shuffle([1, 2, 3, 4, 5])); // 如 [3, 1, 5, 2, 4]
```

### 9. 本地存储

```typescript
import { storage, cookie } from 'bx-utils';

// LocalStorage（支持过期时间）
storage.set('user', { name: 'Tom' }, 3600000); // 1小时后过期
const user = storage.get('user');
storage.remove('user');
storage.clear();

// Cookie
cookie.set('token', 'abc123', 7); // 7天后过期
const token = cookie.get('token');
cookie.remove('token');
```

### 10. 高级功能

```typescript
import { retry, sleep, curry, compose } from 'bx-utils';

// 重试机制
const result = await retry(
  async () => {
    const res = await fetch('https://api.example.com/data');
    return res.json();
  },
  3, // 重试3次
  2000 // 每次间隔2秒
);

// 休眠
await sleep(1000); // 暂停1秒

// 函数柯里化
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6

// 函数组合
const add1 = (x) => x + 1;
const multiply2 = (x) => x * 2;
const combined = compose(multiply2, add1);
console.log(combined(5)); // 12 (先加1再乘2)
```

## 完整 API 文档

查看 [README.md](./README.md) 获取完整的 API 文档。

## 在线示例

查看 `examples/browser-demo.html` 获取浏览器端的完整示例。
