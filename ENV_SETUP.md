# 环境配置指南

## 📋 配置步骤

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# 在项目根目录执行
touch .env.local
```

### 2. 配置阿里云通义千问 API

#### 2.1 获取 API Key

1. **访问阿里云百炼平台**
   - 网址: https://dashscope.aliyun.com/
   - 或访问: https://www.aliyun.com/

2. **注册/登录账号**
   - 如果没有账号，需要先注册
   - 需要进行实名认证

3. **开通服务**
   - 进入 "百炼平台" > "产品" > "通义千问"
   - 选择 "qwen-plus" 或 "qwen-turbo" 模型
   - 查看定价，开通服务（有免费额度）

4. **创建 API Key**
   - 进入 "API-KEY管理"
   - 点击 "创建新的API-KEY"
   - 复制生成的 API Key（只显示一次，请妥善保存）

#### 2.2 填写环境变量

打开 `.env.local` 文件，填入以下内容：

```env
# 阿里云通义千问 API 配置
ALIBABA_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxx
ALIBABA_API_URL=https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation

# 应用配置
NEXT_PUBLIC_APP_NAME=心灵陪伴
NEXT_PUBLIC_APP_DESCRIPTION=您的专属心理陪伴导师
```

**重要说明**:
- 将 `sk-xxxxxxxxxxxxxxxxxxxxxx` 替换为你的真实 API Key
- API URL 保持不变（除非阿里云更改了接口地址）

### 3. 验证配置

启动开发服务器测试配置是否正确：

```bash
npm run dev
```

访问 http://localhost:3000，进行登录并发送消息，检查 AI 是否能正常回复。

## 🆓 免费额度说明

阿里云通义千问提供免费试用额度：

- **免费额度**: 每个账号有一定的免费调用次数
- **付费模式**: 超出免费额度后按使用量计费
- **计费方式**: 
  - qwen-turbo: 约 ¥0.008/1000 tokens
  - qwen-plus: 约 ¥0.02/1000 tokens
  - qwen-max: 约 ¥0.12/1000 tokens

**建议**: 开发测试阶段使用 qwen-turbo 或 qwen-plus 即可。

## 🔒 安全提示

1. **不要提交 `.env.local` 到 Git**
   - 项目已配置 `.gitignore` 忽略此文件
   - 确保不要手动添加此文件到版本控制

2. **API Key 保护**
   - 不要将 API Key 硬编码在代码中
   - 不要在前端代码中使用 API Key
   - 定期更换 API Key

3. **生产环境配置**
   - 使用平台的环境变量管理功能（如 Vercel Environment Variables）
   - 启用 API 访问限制和监控

## 🧪 测试模式

如果暂时没有 API Key，项目会自动启用模拟响应模式：

- 系统会检测 API Key 是否存在
- 如果不存在或调用失败，会使用本地的模拟回复
- 模拟模式下的回复基于简单的关键词匹配

**模拟模式下的功能**:
- ✅ 可以正常登录和使用界面
- ✅ 可以发送和接收消息
- ✅ 基本的对话功能
- ❌ 没有真实的 AI 理解能力
- ❌ 回复较为机械和简单

## 🚀 生产环境部署

### Vercel 部署

1. 在 Vercel 项目设置中添加环境变量：
   ```
   ALIBABA_API_KEY = sk-your-actual-key
   ALIBABA_API_URL = https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation
   ```

2. 保存并重新部署项目

### 其他平台

各平台都有环境变量配置功能：
- **Netlify**: Site settings > Environment variables
- **Railway**: Variables 标签页
- **自建服务器**: 使用 `.env.local` 文件或系统环境变量

## 🆘 常见问题

### Q1: API 调用失败怎么办？

**检查清单**:
1. 确认 API Key 是否正确
2. 确认账号是否有足够余额
3. 检查网络连接
4. 查看浏览器控制台的错误信息
5. 检查 API URL 是否正确

### Q2: 如何查看 API 使用量？

1. 登录阿里云控制台
2. 进入 "百炼平台" > "用量统计"
3. 查看调用次数和费用

### Q3: 如何更换模型？

在 `app/api/chat/route.ts` 中修改模型参数：

```typescript
model: "qwen-plus", // 可选: qwen-turbo, qwen-plus, qwen-max
```

### Q4: 如何调整 AI 回复风格？

在 `app/api/chat/route.ts` 中修改 `systemPrompt` 和参数：

```typescript
parameters: {
  temperature: 0.8, // 0-1，越高越有创造性
  top_p: 0.9,       // 采样概率
  max_tokens: 1500, // 最大回复长度
}
```

## 📞 获取帮助

- **阿里云文档**: https://help.aliyun.com/zh/dashscope/
- **API 参考**: https://dashscope.aliyun.com/api
- **技术支持**: 阿里云工单系统

---

配置完成后，就可以开始使用完整的心理陪伴服务了！💝

