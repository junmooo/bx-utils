# 发布到 NPM

## 发布前准备

### 1. 注册 NPM 账号

如果还没有 NPM 账号，请访问 https://www.npmjs.com/ 注册。

### 2. 登录 NPM

```bash
npm login
```

输入你的用户名、密码和邮箱。

### 3. 检查包名是否可用

```bash
npm view bx-utils
```

如果返回 404，说明包名可用。如果已存在，需要在 `package.json` 中修改包名。

## 发布步骤

### 1. 确保所有测试通过

```bash
npm test
```

### 2. 构建项目

```bash
npm run build
```

### 3. 检查要发布的文件

```bash
npm pack --dry-run
```

这会显示将要发布的文件列表。

### 4. 发布到 NPM

```bash
npm publish
```

## 版本管理

使用语义化版本控制：

- **补丁版本** (1.0.x): 修复 bug
  ```bash
  npm version patch
  ```

- **次版本** (1.x.0): 添加新功能，但保持向后兼容
  ```bash
  npm version minor
  ```

- **主版本** (x.0.0): 不向后兼容的更改
  ```bash
  npm version major
  ```

执行版本命令后，会自动更新 `package.json` 中的版本号并创建 git tag。

然后再次发布：
```bash
npm publish
```

## 发布测试版

如果想发布测试版本：

```bash
# 更新版本为 beta
npm version prerelease --preid=beta

# 发布到 beta 标签
npm publish --tag beta
```

用户可以通过以下方式安装测试版：
```bash
npm install bx-utils@beta
```

## 撤销发布

如果需要撤销刚发布的版本（24小时内）：

```bash
npm unpublish bx-utils@1.0.0
```

⚠️ **注意**: 不建议撤销已被广泛使用的版本。

## 发布后验证

```bash
# 查看包信息
npm view bx-utils

# 安装并测试
npm install bx-utils
```

## 维护建议

1. **README.md**: 保持文档更新，包含清晰的使用示例
2. **CHANGELOG.md**: 记录每个版本的更改
3. **版本号**: 遵循语义化版本控制
4. **测试**: 发布前确保所有测试通过
5. **标签**: 为每个版本打上 git tag
6. **issues**: 及时回复用户提出的问题

## 自动化发布

可以配置 GitHub Actions 自动发布：

创建 `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

需要在 GitHub 仓库的 Settings > Secrets 中添加 `NPM_TOKEN`。
