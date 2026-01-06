<div align="center">
  <img src="public/logo.svg" alt="心灵陪伴 Logo" width="120" height="120">
  
  # 心灵陪伴 - 心理咨询陪伴平台
  
  <img src="public/banner.svg" alt="心灵陪伴 Banner" width="100%">
  
  一个基于 Next.js 14 的温暖、专业的心理咨询与陪伴服务平台  
  集成阿里云通义千问大模型，提供流式智能对话服务
</div>

## ✨ 功能特点

- 🌸 **温馨界面设计** - 温柔舒适的视觉体验，让用户放松心情
- 📱 **多端响应式** - 完美支持手机、平板和桌面端
- 🤖 **智能对话** - 集成阿里云通义千问，提供专业的心理陪伴
- ⚡ **流式响应** - AI回复实时流式输出，打字机效果，提升用户体验
- 👤 **用户系统** - 简单的登录系统，保存用户信息
- 💰 **广告位预留** - 为后期商业化预留广告展示位置
- 🚀 **无需后端** - 基于 Next.js API Routes，无需独立后端服务

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **AI**: 阿里云通义千问 API
- **存储**: LocalStorage (客户端存储)

## 📦 快速开始

### 1. 安装依赖

```bash
pnpm install
# 或
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件并添加以下配置：

```env
# 阿里云通义千问 API 配置
ALIBABA_API_KEY=your_alibaba_api_key_here
ALIBABA_API_URL=https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation

# 应用配置
NEXT_PUBLIC_APP_NAME=心灵陪伴
NEXT_PUBLIC_APP_DESCRIPTION=您的专属心理陪伴导师
```

### 3. 获取阿里云 API Key

1. 访问 [阿里云百炼平台](https://www.alibabacloud.com/help/zh/dashscope/)
2. 注册并登录账号
3. 开通通义千问服务
4. 获取 API Key
5. 将 API Key 填入 `.env.local` 文件

### 4. 启动开发服务器

```bash
pnpm dev
# 或
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 5. 构建生产版本

```bash
pnpm build
pnpm start
# 或
npm run build
npm start
```

## 📁 项目结构

```
nextjs/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── chat/          # 聊天 API
│   ├── chat/              # 聊天页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页（登录页）
├── components/            # React 组件
│   ├── AdBanner.tsx       # 广告位组件
│   ├── ChatInterface.tsx  # 聊天界面
│   └── LoginPage.tsx      # 登录页面
├── public/                # 静态资源
├── .env.local            # 环境变量（需自行创建）
├── next.config.mjs       # Next.js 配置
├── package.json          # 项目依赖
├── tailwind.config.ts    # Tailwind 配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 项目文档
```

## 🎨 设计特点

### 色彩方案
- **主色调**: 温暖的粉橙色系 (Primary)
- **辅助色**: 温馨的暖黄色系 (Warm)
- **背景**: 渐变的柔和背景，营造温馨氛围

### 响应式设计
- **移动端**: 单列布局，触摸友好
- **平板端**: 优化的中等屏幕体验
- **桌面端**: 宽屏布局，额外广告位

### 交互设计
- 流畅的动画效果
- 友好的错误提示
- 实时消息反馈

## 🔧 功能说明

### 用户系统
- 使用 LocalStorage 存储用户信息
- 简单的昵称+邮箱登录
- 头像使用 DiceBear API 生成
- 支持登出功能

### 聊天功能
- 实时对话界面
- 消息历史记录
- 打字指示器
- 自动滚动到最新消息

### AI 集成
- 调用阿里云通义千问 API（SSE流式模式）
- 实时流式输出，打字机效果
- 智能的心理咨询回复
- 支持上下文理解
- 模拟流式响应功能（无 API Key 时）

### 广告系统
- 顶部横幅广告位
- 底部广告位（桌面端）
- 可关闭的广告
- 预留的广告内容区域

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量（ALIBABA_API_KEY）
4. 点击部署

### 其他平台

本项目可部署到任何支持 Next.js 的平台，如：
- Netlify
- Railway
- AWS Amplify
- 自建服务器

## ⚠️ 注意事项

1. **API Key 安全**: 
   - 不要将 `.env.local` 文件提交到 Git
   - 使用环境变量管理敏感信息

2. **数据存储**: 
   - 目前使用 LocalStorage，数据仅存储在本地
   - 生产环境建议使用数据库（如 Supabase、MongoDB）

3. **AI 响应**: 
   - 未配置 API Key 时会使用模拟响应
   - 生产环境务必配置真实的 API Key

4. **隐私保护**: 
   - 本项目不应用于替代专业心理治疗
   - 涉及严重心理问题时，应建议用户寻求专业帮助

## 📝 待改进功能

- [ ] 添加数据库支持，实现真正的用户系统
- [ ] 聊天历史云端同步
- [ ] 多会话管理
- [ ] 情绪分析和统计
- [ ] 更丰富的 AI 人格设定
- [ ] 真实的广告系统集成
- [ ] 支付系统（会员功能）
- [ ] 专业咨询师预约功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**重要提醒**: 本应用仅供心理陪伴和情绪支持，不能替代专业的心理治疗。如遇严重心理问题，请及时寻求专业医疗帮助。

💝 愿每个人都能得到温暖的陪伴和理解

