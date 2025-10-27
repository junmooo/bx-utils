# bx-utils 项目总结

## 项目概述

`bx-utils` 是一个功能丰富的 JavaScript/TypeScript 工具函数库，提供了70+个常用工具方法，涵盖了日常开发中的大部分场景。

## 功能模块

### 1. 性能优化 (performance.ts)
- **debounce**: 防抖函数
- **throttle**: 节流函数

### 2. 剪贴板操作 (clipboard.ts)
- **copyText**: 复制文本到剪贴板
- **copyFile**: 复制文件到剪贴板
- **readClipboardText**: 读取剪贴板内容

### 3. 校验工具 (validation.ts)
- **validateIdCard**: 身份证号码校验（支持15位和18位）
- **validatePassport**: 中国护照号码校验
- **validateCreditCode**: 统一社会信用代码校验
- **validatePhone**: 手机号码校验
- **validateEmail**: 邮箱地址校验
- **validateURL**: URL校验
- **validateIPv4**: IPv4地址校验
- **validateBankCard**: 银行卡号校验（Luhn算法）

### 4. 对象操作 (object.ts)
- **deepClone**: 深拷贝（支持Date、RegExp、Map、Set等）
- **deepMerge**: 深度合并对象

### 5. 日期时间 (date.ts)
- **formatDate**: 日期格式化（支持自定义格式）
- **timeAgo**: 相对时间显示
- **daysBetween**: 计算两个日期间的天数

### 6. 随机工具 (random.ts)
- **randomString**: 生成随机字符串
- **uuid**: 生成UUID
- **randomInt**: 生成随机整数
- **shuffle**: 随机打乱数组

### 7. 格式化 (format.ts)
- **formatFileSize**: 文件大小格式化
- **formatNumber**: 数字千分位格式化
- **formatCurrency**: 金额格式化
- **numberToChinese**: 数字转中文大写

### 8. 数组操作 (array.ts)
- **unique**: 数组去重
- **chunk**: 数组分组
- **flatten**: 数组扁平化
- **sum**: 数组求和
- **average**: 数组平均值
- **max/min**: 最大/最小值
- **intersection**: 数组交集
- **union**: 数组并集
- **difference**: 数组差集

### 9. 字符串操作 (string.ts)
- **isEmpty**: 判断空字符串
- **capitalize**: 首字母大写
- **camelToSnake**: 驼峰转下划线
- **snakeToCamel**: 下划线转驼峰
- **truncate**: 字符串截断
- **stripHtml**: 移除HTML标签
- **escapeHtml**: 转义HTML
- **unescapeHtml**: 反转义HTML

### 10. URL操作 (url.ts)
- **getUrlParams**: 获取URL参数
- **setUrlParams**: 设置URL参数
- **removeUrlParams**: 移除URL参数
- **parseUrl**: 解析URL

### 11. 存储操作 (storage.ts)
- **storage.set/get/remove/clear**: LocalStorage操作（支持过期时间）
- **cookie.set/get/remove**: Cookie操作

### 12. 通用工具 (common.ts)
- **getType**: 获取数据类型
- **isPromise**: 判断是否为Promise
- **sleep**: 休眠函数
- **retry**: 重试机制
- **curry**: 函数柯里化
- **compose**: 函数组合（从右到左）
- **pipe**: 函数管道（从左到右）

## 技术栈

- **TypeScript**: 提供完整的类型支持
- **Rollup**: 打包工具，生成 CJS 和 ESM 两种格式
- **Jest**: 单元测试框架
- **ts-jest**: TypeScript 测试支持

## 项目结构

```
bx-utils/
├── src/                    # 源代码
│   ├── performance.ts      # 性能优化
│   ├── clipboard.ts        # 剪贴板操作
│   ├── validation.ts       # 校验工具
│   ├── object.ts           # 对象操作
│   ├── date.ts            # 日期时间
│   ├── random.ts          # 随机工具
│   ├── format.ts          # 格式化
│   ├── array.ts           # 数组操作
│   ├── string.ts          # 字符串操作
│   ├── url.ts             # URL操作
│   ├── storage.ts         # 存储操作
│   ├── common.ts          # 通用工具
│   ├── index.ts           # 入口文件
│   └── __tests__/         # 测试文件
├── examples/              # 使用示例
│   ├── usage.ts          # TypeScript示例
│   └── browser-demo.html # 浏览器示例
├── dist/                  # 构建输出
│   ├── index.js          # CommonJS格式
│   ├── index.esm.js      # ES Module格式
│   └── index.d.ts        # TypeScript类型定义
├── package.json           # 项目配置
├── tsconfig.json         # TypeScript配置
├── rollup.config.js      # Rollup配置
├── jest.config.js        # Jest配置
├── README.md             # 完整文档
├── QUICKSTART.md         # 快速开始
├── PUBLISH.md            # 发布指南
├── CHANGELOG.md          # 更新日志
└── .gitignore            # Git忽略文件

## 使用方式

### 安装
```bash
npm install bx-utils
```

### 导入
```typescript
// ES6 模块
import { debounce, deepClone, validateEmail } from 'bx-utils';

// CommonJS
const { debounce, deepClone, validateEmail } = require('bx-utils');
```

## 特性

✅ **完整的 TypeScript 支持** - 提供完整的类型定义  
✅ **零依赖** - 不依赖任何第三方库  
✅ **Tree-shakable** - 支持按需引入，减小打包体积  
✅ **浏览器和 Node.js 双端支持** - 可在任何 JavaScript 环境使用  
✅ **完善的文档** - 每个函数都有详细的使用说明和示例  
✅ **单元测试** - 确保代码质量和稳定性  

## 扩展建议

未来可以继续添加的工具类：

1. **颜色转换工具**: RGB、HEX、HSL 互转
2. **文件操作**: 文件上传、下载、类型判断
3. **图片处理**: 压缩、裁剪、格式转换
4. **加密解密**: Base64、MD5、SHA256
5. **正则表达式**: 常用正则表达式集合
6. **数学运算**: 精确计算、统计函数
7. **浏览器检测**: 浏览器类型、版本、设备判断
8. **性能监控**: 页面加载时间、资源加载监控
9. **DOM 操作**: 常用 DOM 操作封装
10. **事件总线**: 简单的发布订阅模式实现

## 发布流程

1. 确保所有测试通过：`npm test`
2. 构建项目：`npm run build`
3. 登录 NPM：`npm login`
4. 发布：`npm publish`

详细发布流程见 [PUBLISH.md](./PUBLISH.md)

## 维护建议

1. 定期更新依赖包
2. 及时修复发现的 bug
3. 根据用户反馈添加新功能
4. 保持文档更新
5. 遵循语义化版本控制
6. 编写充分的单元测试

## 许可证

MIT License - 可自由使用、修改和分发
