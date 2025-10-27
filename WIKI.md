# bx-utils - 完整的 npm 包开发与发布指南

> 一个功能丰富的 JavaScript/TypeScript 工具函数库开发实践

## 📋 目录

- [项目概述](#项目概述)
- [项目结构](#项目结构)
- [技术栈](#技术栈)
- [项目构建过程](#项目构建过程)
- [功能模块详解](#功能模块详解)
- [发布到 NPM 流程](#发布到-npm-流程)
- [使用方法](#使用方法)
- [最佳实践](#最佳实践)

---

## 项目概述

**bx-utils** 是一个零依赖的 JavaScript/TypeScript 工具函数库，提供了 70+ 个常用工具方法，涵盖性能优化、数据校验、格式化、数组操作等多个领域。

### 核心特性

✅ **完整的 TypeScript 支持** - 提供完整的类型定义  
✅ **零依赖** - 不依赖任何第三方库  
✅ **Tree-shakable** - 支持按需引入，减小打包体积  
✅ **双端支持** - 浏览器和 Node.js 环境均可使用  
✅ **完善的文档** - 每个函数都有详细说明和示例  
✅ **单元测试** - 确保代码质量和稳定性  

### NPM 包信息

- **包名**: bx-utils
- **版本**: 1.0.0
- **许可证**: MIT
- **NPM 链接**: https://www.npmjs.com/package/bx-utils
- **包大小**: 39.2 KB (压缩后)
- **解压大小**: 189.5 KB

---

## 项目结构

```
bx-utils/
├── src/                          # 源代码目录
│   ├── performance.ts            # 性能优化：防抖、节流
│   ├── clipboard.ts              # 剪贴板操作
│   ├── validation.ts             # 校验工具：身份证、手机号等
│   ├── object.ts                 # 对象操作：深拷贝、深度合并
│   ├── date.ts                   # 日期时间：格式化、相对时间
│   ├── random.ts                 # 随机工具：UUID、随机字符串
│   ├── format.ts                 # 格式化：文件大小、金额
│   ├── array.ts                  # 数组操作：去重、分组、求和
│   ├── string.ts                 # 字符串操作：转换、截断
│   ├── url.ts                    # URL操作：参数处理、解析
│   ├── storage.ts                # 存储操作：LocalStorage、Cookie
│   ├── common.ts                 # 通用工具：类型判断、重试
│   ├── index.ts                  # 入口文件，导出所有函数
│   └── __tests__/                # 测试文件目录
│       ├── validation.test.ts    # 校验工具测试
│       ├── object.test.ts        # 对象操作测试
│       └── array.test.ts         # 数组操作测试
│
├── dist/                         # 构建输出目录（自动生成）
│   ├── index.js                  # CommonJS 格式
│   ├── index.esm.js              # ES Module 格式
│   ├── index.d.ts                # TypeScript 类型定义
│   ├── index.js.map              # Source Map（CJS）
│   └── index.esm.js.map          # Source Map（ESM）
│
├── examples/                     # 使用示例
│   ├── usage.ts                  # TypeScript 使用示例
│   └── browser-demo.html         # 浏览器交互示例
│
├── node_modules/                 # 依赖包（自动生成）
│
├── package.json                  # 项目配置文件
├── tsconfig.json                 # TypeScript 配置
├── rollup.config.js              # Rollup 打包配置
├── jest.config.js                # Jest 测试配置
├── .gitignore                    # Git 忽略文件
│
├── README.md                     # 完整使用文档
├── QUICKSTART.md                 # 快速开始指南
├── CHANGELOG.md                  # 版本更新日志
├── LICENSE                       # MIT 许可证
├── PUBLISH.md                    # 发布指南
├── HOW_TO_PUBLISH.md             # 详细发布步骤
├── HOW_TO_VIEW_DEMO.md           # 查看示例说明
├── PROJECT_SUMMARY.md            # 项目总结
├── SUCCESS.md                    # 发布成功说明
└── WIKI.md                       # 本文档（完整指南）
```

---

## 技术栈

### 核心技术

| 技术 | 版本 | 用途 |
|------|------|------|
| TypeScript | ^5.3.3 | 提供类型支持，编写类型安全的代码 |
| Rollup | ^4.9.4 | 打包工具，生成多种模块格式 |
| Jest | ^29.7.0 | 单元测试框架 |
| ts-jest | ^29.1.1 | TypeScript 测试支持 |

### Rollup 插件

- `@rollup/plugin-typescript` - 编译 TypeScript
- `@rollup/plugin-node-resolve` - 解析 node_modules 中的模块
- `@rollup/plugin-commonjs` - 转换 CommonJS 模块
- `rollup-plugin-dts` - 生成类型定义文件

### 开发工具

- `nrm` - NPM 源管理工具
- `http-server` 或 `python3 -m http.server` - 本地开发服务器

---

## 项目构建过程

### 第一步：初始化项目

```bash
# 创建项目目录
mkdir bx-utils
cd bx-utils

# 初始化 package.json
npm init -y
```

### 第二步：配置 package.json

```json
{
  "name": "bx-utils",
  "version": "1.0.0",
  "description": "常用JavaScript工具函数库",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md", "CHANGELOG.md", "LICENSE"],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "utils", "tools", "debounce", "throttle", 
    "validation", "typescript"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT"
}
```

**关键配置说明**：
- `"type": "module"` - 使用 ES Module
- `"main"` - CommonJS 入口
- `"module"` - ES Module 入口
- `"types"` - TypeScript 类型定义
- `"files"` - 指定发布到 npm 的文件
- `"prepublishOnly"` - 发布前自动构建

### 第三步：安装依赖

```bash
npm install --save-dev \
  typescript \
  rollup \
  @rollup/plugin-typescript \
  @rollup/plugin-node-resolve \
  @rollup/plugin-commonjs \
  rollup-plugin-dts \
  tslib \
  jest \
  ts-jest \
  @types/jest \
  @types/node
```

### 第四步：配置 TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "lib": ["ES2019", "DOM"],
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### 第五步：配置 Rollup (rollup.config.js)

```javascript
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

export default [
  // 生成 JS 代码
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
    ],
  },
  // 生成类型定义
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
```

### 第六步：配置 Jest (jest.config.js)

```javascript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
};
```

### 第七步：编写源代码

在 `src/` 目录下创建各个功能模块文件，例如：

**src/performance.ts** - 防抖和节流
```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    }
  };
}
```

### 第八步：创建入口文件 (src/index.ts)

```typescript
// 导出所有功能模块
export { debounce, throttle } from './performance';
export { copyText, copyFile, readClipboardText } from './clipboard';
export { validateIdCard, validatePhone, validateEmail } from './validation';
export { deepClone, deepMerge } from './object';
export { formatDate, timeAgo, daysBetween } from './date';
// ... 导出其他模块
```

### 第九步：编写测试

在 `src/__tests__/` 目录下创建测试文件：

```typescript
import { validateIdCard, validatePhone } from '../validation';

describe('validation', () => {
  test('应该验证有效的身份证号', () => {
    expect(validateIdCard('11010119900101001X')).toBe(true);
  });

  test('应该验证有效的手机号', () => {
    expect(validatePhone('13800138000')).toBe(true);
  });
});
```

### 第十步：构建项目

```bash
# 开发模式（监听文件变化）
npm run dev

# 生产构建
npm run build

# 运行测试
npm test
```

构建后会在 `dist/` 目录生成：
- `index.js` - CommonJS 格式
- `index.esm.js` - ES Module 格式
- `index.d.ts` - TypeScript 类型定义
- `*.map` - Source Map 文件

---

## 功能模块详解

### 1. 性能优化模块 (performance.ts)

**功能**：防抖和节流函数

```typescript
import { debounce, throttle } from 'bx-utils';

// 防抖：用户停止输入500ms后执行
const search = debounce((keyword) => {
  console.log('搜索:', keyword);
}, 500);

// 节流：滚动事件每1秒最多触发一次
const scroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 1000);
```

### 2. 校验工具模块 (validation.ts)

**功能**：8种常用数据格式校验

| 函数 | 说明 | 示例 |
|------|------|------|
| validateIdCard | 身份证号校验 | `validateIdCard('110101199001011234')` |
| validatePassport | 护照号校验 | `validatePassport('E12345678')` |
| validateCreditCode | 统一社会信用代码 | `validateCreditCode('91110000...')` |
| validatePhone | 手机号校验 | `validatePhone('13800138000')` |
| validateEmail | 邮箱校验 | `validateEmail('test@example.com')` |
| validateURL | URL校验 | `validateURL('https://example.com')` |
| validateIPv4 | IPv4地址校验 | `validateIPv4('192.168.1.1')` |
| validateBankCard | 银行卡号校验 | `validateBankCard('6222021234...')` |

### 3. 对象操作模块 (object.ts)

```typescript
import { deepClone, deepMerge } from 'bx-utils';

// 深拷贝
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

// 深度合并
const merged = deepMerge({ a: 1 }, { b: 2 });
```

### 4. 日期时间模块 (date.ts)

```typescript
import { formatDate, timeAgo, daysBetween } from 'bx-utils';

// 格式化日期
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');

// 相对时间
timeAgo(new Date(Date.now() - 5 * 60 * 1000)); // '5分钟前'

// 计算天数差
daysBetween(new Date('2024-01-01'), new Date('2024-01-10')); // 9
```

### 5. 数组操作模块 (array.ts)

```typescript
import { unique, chunk, sum, average } from 'bx-utils';

unique([1, 2, 2, 3]); // [1, 2, 3]
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
sum([1, 2, 3, 4, 5]); // 15
average([1, 2, 3, 4, 5]); // 3
```

### 6. 格式化模块 (format.ts)

```typescript
import { formatFileSize, formatCurrency, formatNumber } from 'bx-utils';

formatFileSize(1536000); // '1.46 MB'
formatCurrency(12345.67); // '¥12,345.67'
formatNumber(1234567); // '1,234,567'
```

### 7-12. 其他模块

- **clipboard.ts**: 剪贴板操作
- **random.ts**: 随机工具（UUID、随机字符串）
- **string.ts**: 字符串操作
- **url.ts**: URL参数处理
- **storage.ts**: LocalStorage 和 Cookie 封装
- **common.ts**: 通用工具（类型判断、重试机制）

---

## 发布到 NPM 流程

### 准备工作

#### 1. 注册 NPM 账号

访问 https://www.npmjs.com/ 注册账号

#### 2. 安装 nrm（源管理工具）

```bash
npm install -g nrm
```

#### 3. 查看和切换 NPM 源

```bash
# 查看所有可用源
nrm ls

# 切换到 npm 官方源（发布时使用）
nrm use npm

# 验证当前源
npm config get registry
# 应该显示: https://registry.npmjs.org/
```

### 发布步骤

#### Step 1: 登录 NPM

```bash
npm login
```

输入用户名、密码和邮箱

验证登录状态：
```bash
npm whoami
```

#### Step 2: 检查包名是否可用

```bash
npm view bx-utils
```

如果返回 404，说明包名可用

#### Step 3: 完善 package.json

确保以下字段正确：
```json
{
  "name": "bx-utils",
  "version": "1.0.0",
  "description": "功能描述",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/bx-utils.git"
  },
  "keywords": ["utils", "tools", "typescript"]
}
```

#### Step 4: 预览发布文件

```bash
npm pack --dry-run
```

查看将要发布的文件列表

#### Step 5: 执行发布

```bash
npm publish
```

发布成功后会显示：
```
+ bx-utils@1.0.0
```

#### Step 6: 验证发布

```bash
npm view bx-utils
```

查看包信息

#### Step 7: 等待 cnpm 同步

- npm 官方发布后，cnpm (淘宝镜像) 会自动同步
- 同步时间：10-30 分钟
- 无需单独发布到 cnpm

#### Step 8: 切回淘宝源（日常使用）

```bash
nrm use taobao
```

### 版本管理

发布新版本时：

```bash
# 修复 bug：1.0.0 → 1.0.1
npm version patch

# 新增功能：1.0.0 → 1.1.0
npm version minor

# 重大更新：1.0.0 → 2.0.0
npm version major

# 然后发布
npm publish
```

### 发布检查清单

- [ ] 所有测试通过 (`npm test`)
- [ ] 项目已构建 (`npm run build`)
- [ ] package.json 信息完整
- [ ] README.md 文档完善
- [ ] CHANGELOG.md 更新日志
- [ ] LICENSE 许可证文件
- [ ] 已登录 npm 账号
- [ ] 切换到 npm 官方源
- [ ] 包名未被占用

---

## 使用方法

### 安装

```bash
# 从 npm 安装
npm install bx-utils

# 从 yarn 安装
yarn add bx-utils

# 从 pnpm 安装
pnpm add bx-utils
```

### 导入方式

#### ES6 模块导入

```typescript
// 按需导入
import { debounce, validateEmail, deepClone } from 'bx-utils';

// 导入全部
import * as utils from 'bx-utils';
```

#### CommonJS 导入

```javascript
// 按需导入
const { debounce, validateEmail, deepClone } = require('bx-utils');

// 导入全部
const utils = require('bx-utils');
```

#### 浏览器直接使用

```html
<script type="module">
  import { debounce, validateEmail } from './node_modules/bx-utils/dist/index.esm.js';
  
  const search = debounce((keyword) => {
    console.log('搜索:', keyword);
  }, 500);
</script>
```

### 使用示例

#### 1. 表单验证

```typescript
import { validateEmail, validatePhone, validateIdCard } from 'bx-utils';

function validateForm(data) {
  if (!validateEmail(data.email)) {
    return '邮箱格式不正确';
  }
  if (!validatePhone(data.phone)) {
    return '手机号格式不正确';
  }
  if (!validateIdCard(data.idCard)) {
    return '身份证号不正确';
  }
  return null;
}
```

#### 2. 搜索防抖

```typescript
import { debounce } from 'bx-utils';

const searchInput = document.getElementById('search');

const handleSearch = debounce(async (keyword) => {
  const results = await fetch(`/api/search?q=${keyword}`);
  displayResults(results);
}, 500);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

#### 3. 数据格式化

```typescript
import { formatDate, formatFileSize, formatCurrency } from 'bx-utils';

// 显示文件信息
function displayFileInfo(file) {
  return {
    name: file.name,
    size: formatFileSize(file.size),
    uploadTime: formatDate(file.uploadTime, 'YYYY-MM-DD HH:mm:ss')
  };
}

// 显示商品价格
function displayProductPrice(price) {
  return formatCurrency(price); // ¥1,234.56
}
```

#### 4. 深拷贝配置

```typescript
import { deepClone } from 'bx-utils';

const defaultConfig = {
  theme: 'light',
  settings: {
    fontSize: 14,
    lineHeight: 1.5
  }
};

// 创建独立的配置副本
const userConfig = deepClone(defaultConfig);
userConfig.settings.fontSize = 16; // 不影响 defaultConfig
```

#### 5. 数组数据处理

```typescript
import { unique, chunk, sum, average } from 'bx-utils';

// 去重标签
const tags = unique(['JavaScript', 'TypeScript', 'JavaScript']);

// 分页数据
const pageSize = 10;
const pagedData = chunk(allData, pageSize);

// 统计分析
const scores = [85, 90, 78, 92, 88];
const totalScore = sum(scores);
const avgScore = average(scores);
```

### TypeScript 类型支持

bx-utils 提供完整的 TypeScript 类型定义：

```typescript
import { debounce, validateEmail, deepClone } from 'bx-utils';

// 自动类型推导
const handleClick = debounce((event: MouseEvent) => {
  console.log(event.clientX, event.clientY);
}, 300);

// 泛型支持
interface User {
  name: string;
  age: number;
}

const user: User = { name: 'Tom', age: 20 };
const clonedUser = deepClone<User>(user); // clonedUser 类型为 User
```

---

## 最佳实践

### 1. 按需引入

使用 ES6 模块导入，打包工具会自动 Tree-shaking：

```typescript
// ✅ 推荐：按需导入
import { debounce, validateEmail } from 'bx-utils';

// ❌ 不推荐：导入全部
import * as utils from 'bx-utils';
```

### 2. 防抖和节流使用场景

```typescript
import { debounce, throttle } from 'bx-utils';

// 防抖：适用于输入搜索、窗口 resize
const search = debounce(handleSearch, 500);
const resize = debounce(handleResize, 300);

// 节流：适用于滚动、鼠标移动
const scroll = throttle(handleScroll, 1000);
const mousemove = throttle(handleMouseMove, 100);
```

### 3. 错误处理

```typescript
import { copyText, validateEmail } from 'bx-utils';

// 异步操作记得处理错误
async function copyToClipboard(text: string) {
  try {
    const success = await copyText(text);
    if (success) {
      console.log('复制成功');
    } else {
      console.log('复制失败');
    }
  } catch (error) {
    console.error('复制出错:', error);
  }
}

// 校验函数通常返回布尔值
function validateUserInput(email: string) {
  if (!validateEmail(email)) {
    throw new Error('邮箱格式不正确');
  }
}
```

### 4. 性能优化

```typescript
import { deepClone, storage } from 'bx-utils';

// 对于大对象，考虑使用浅拷贝或部分拷贝
const largeObject = { /* 大量数据 */ };

// 如果只需要拷贝一层
const shallowCopy = { ...largeObject };

// 如果需要深拷贝
const deepCopy = deepClone(largeObject);

// 使用 storage 时设置过期时间
storage.set('cache', data, 3600000); // 1小时后过期
```

### 5. 开发调试

```typescript
import { getType, isPromise } from 'bx-utils';

// 使用类型判断工具调试
console.log(getType([])); // 'array'
console.log(getType(new Date())); // 'date'
console.log(isPromise(fetch('/api'))); // true
```

---

## 常见问题

### Q1: 如何更新包版本？

```bash
# 修改版本号
npm version patch/minor/major

# 发布新版本
npm publish
```

### Q2: 发布失败怎么办？

```bash
# 检查是否登录
npm whoami

# 检查当前源
npm config get registry

# 如果是淘宝源，切换到官方源
nrm use npm

# 重新发布
npm publish
```

### Q3: 如何撤销发布？

```bash
# 只能撤销24小时内发布的包
npm unpublish bx-utils@1.0.0

# 不建议撤销已被使用的版本
```

### Q4: 如何在项目中使用本地开发的包？

```bash
# 在 bx-utils 目录
npm link

# 在你的项目目录
npm link bx-utils
```

---

## 总结

通过本文档，你已经学会了：

1. ✅ 如何从零开始创建一个 npm 包
2. ✅ 如何配置 TypeScript 和 Rollup
3. ✅ 如何编写可复用的工具函数
4. ✅ 如何发布包到 npm 官方仓库
5. ✅ 如何在项目中使用自己的包
6. ✅ 如何管理和更新包版本

**bx-utils** 现已成功发布到 npm，任何人都可以通过 `npm install bx-utils` 使用它！

---

## 相关链接

- 📦 **NPM Package**: https://www.npmjs.com/package/bx-utils
- 📖 **完整文档**: [README.md](./README.md)
- 🚀 **快速开始**: [QUICKSTART.md](./QUICKSTART.md)
- 📝 **更新日志**: [CHANGELOG.md](./CHANGELOG.md)
- 🔧 **发布指南**: [HOW_TO_PUBLISH.md](./HOW_TO_PUBLISH.md)

---

**版权声明**: MIT License © 2025 bx-utils contributors
