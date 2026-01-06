# 🚀 快速启动指南

这是一个 5 分钟快速启动指南，让你的心灵陪伴平台快速运行起来！

## ⚡ 最快启动方式（无需 API Key）

如果你想立即看到效果，可以先跳过 API Key 配置，项目会自动使用模拟响应模式。

### 步骤 1: 安装依赖

```bash
npm install
```

如果遇到问题，可以尝试：
```bash
npm install --legacy-peer-deps
```

### 步骤 2: 启动开发服务器

```bash
npm run dev
```

### 步骤 3: 打开浏览器

访问 http://localhost:3000

就这么简单！现在你可以：
- ✅ 使用登录功能
- ✅ 进行对话（使用模拟 AI 响应）
- ✅ 体验完整的界面和功能

## 🔧 配置真实 AI（推荐）

要使用真正的 AI 对话功能，需要配置阿里云 API：

### 步骤 1: 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# Windows 用户
type nul > .env.local

# Mac/Linux 用户
touch .env.local
```

### 步骤 2: 获取 API Key

1. 访问 https://dashscope.aliyun.com/
2. 注册/登录阿里云账号
3. 开通 "通义千问" 服务
4. 创建 API Key

**详细教程**: 查看 `ENV_SETUP.md` 文件

### 步骤 3: 配置 API Key

打开 `.env.local` 文件，填入：

```env
ALIBABA_API_KEY=你的API密钥
ALIBABA_API_URL=https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation
```

### 步骤 4: 重启服务器

按 `Ctrl+C` 停止服务器，然后重新运行：

```bash
npm run dev
```

## 📱 多端测试

### 测试手机端

方法 1: 使用浏览器的响应式模式
- Chrome: 按 F12，点击手机图标
- 选择 iPhone 或 Android 设备

方法 2: 手机实际访问
1. 确保手机和电脑在同一网络
2. 查看电脑的本地 IP（如 192.168.1.100）
3. 手机浏览器访问 http://192.168.1.100:3000

### 测试平板端

使用浏览器响应式模式，选择 iPad 等设备

## 🎨 自定义配置

### 修改主题色

编辑 `tailwind.config.ts`：

```typescript
colors: {
  primary: {
    // 修改这里的颜色值
    500: '#ce8871', // 主色调
  }
}
```

### 修改 AI 人格

编辑 `app/api/chat/route.ts` 中的 `systemPrompt`

### 修改页面标题

编辑 `app/layout.tsx` 中的 `metadata`

## 🐛 常见问题

### 问题 1: 安装依赖失败

**解决方案**:
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 2: 端口被占用

**解决方案**:
```bash
# 使用其他端口
npm run dev -- -p 3001
```

### 问题 3: 页面空白

**解决方案**:
1. 检查浏览器控制台是否有错误
2. 清除浏览器缓存
3. 使用无痕模式访问

### 问题 4: AI 不回复

**检查清单**:
- [ ] `.env.local` 文件是否创建
- [ ] API Key 是否正确填写
- [ ] 是否重启了开发服务器
- [ ] 查看控制台是否有错误信息

## 📦 部署到生产环境

### 方式 1: Vercel（最简单）

1. 将代码推送到 GitHub
2. 访问 https://vercel.com
3. 导入 GitHub 项目
4. 在环境变量中添加 `ALIBABA_API_KEY`
5. 点击部署

### 方式 2: 自己的服务器

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 🎯 下一步

- 📖 阅读完整文档: `README.md`
- 🔧 详细配置指南: `ENV_SETUP.md`
- 💡 自定义功能和样式
- 🚀 部署到生产环境

## 📞 需要帮助？

- 查看 `README.md` 的常见问题部分
- 阅读 `ENV_SETUP.md` 的详细配置说明
- 检查浏览器控制台的错误信息

---

祝你使用愉快！💝 如果觉得这个项目有帮助，记得给个 Star ⭐

