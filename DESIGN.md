# 设计资源说明

## 🎨 图标和Banner

本项目包含了一套完整的视觉设计资源，体现"可爱、温馨、暖暖"的设计风格。

### 设计文件

```
public/
├── logo.svg          # 应用Logo（512x512）
├── banner.svg        # 横幅Banner（1200x400）
└── og-image.svg      # 社交媒体分享图（1200x630）
```

### Logo设计 (`logo.svg`)
- **尺寸**: 512x512px
- **主元素**: 温暖的心形，带有渐变色彩
- **色彩方案**: 
  - 主色: #FF6B9D (粉红色)
  - 辅助色: #FFA07A (浅珊瑚色)
  - 强调色: #FFB88C (蜜桃色)
- **特效**: 
  - 闪烁的星星装饰
  - 飘动的小心形
  - 柔和的渐变背景
- **用途**: 
  - 网站favicon
  - 登录页面Logo
  - 聊天界面头部Logo

### Banner设计 (`banner.svg`)
- **尺寸**: 1200x400px
- **元素**: 
  - 左侧: 大型心形图标
  - 右侧: 品牌名称和标语
  - 装饰: 飘动的心形、星星点缀
- **文字内容**:
  - 主标题: 心灵陪伴
  - 副标题: Soul Partner
  - 标语: 温暖陪伴 · 用心倾听 · 智能关怀
- **用途**: 
  - README展示
  - 项目介绍页面
  - 文档头部

### OG图片 (`og-image.svg`)
- **尺寸**: 1200x630px (社交媒体最佳尺寸)
- **设计**: 类似Banner但针对社交分享优化
- **用途**: 
  - Facebook分享预览
  - Twitter卡片
  - LinkedIn链接预览
  - 微信分享缩略图

## 🎨 色彩系统

### 主色调 (Primary)
```
50:  #FFF5F7  // 极浅粉
100: #FFE5E5  // 浅粉
200: #FFD0D0  // 柔和粉
300: #FFB0B0  // 中等粉
400: #FF9A9E  // 活泼粉
500: #FF6B9D  // 主色粉 ⭐
600: #E05588  // 深粉
```

### 暖色调 (Warm)
```
50:  #FFF8F0  // 象牙白
100: #FFF0E5  // 杏仁白
200: #FFE5D9  // 蜜桃白
300: #FFD6C8  // 浅橙
400: #FFC4A3  // 柔和橙
500: #FFB88C  // 暖橙 ⭐
600: #FFA07A  // 珊瑚橙 ⭐
```

## 💫 动画效果

### Logo动画
- **星星闪烁**: 2-2.5秒循环，透明度变化
- **心形飘动**: 3-3.5秒循环，Y轴平移 -20px 到 -25px

### Banner动画
- **装饰心形**: 上下飘动效果
- **描边动画**: 心形边框宽度变化 3-5px

### 使用的动画
```css
/* 在 globals.css 中定义 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
```

## 📐 设计规范

### 圆角
- 按钮: `rounded-xl` (12px)
- 卡片: `rounded-2xl` (16px)
- 表单: `rounded-3xl` (24px)
- Logo: `rounded-full` (圆形)

### 阴影
- 轻: `shadow-md` (中等阴影)
- 中: `shadow-lg` (大阴影)
- 重: `shadow-xl` (超大阴影)

### 间距
- 小: 8-12px (`gap-2`, `gap-3`)
- 中: 16-24px (`gap-4`, `gap-6`)
- 大: 32-48px (`gap-8`, `gap-12`)

## 🖼️ 图片格式转换

### 如果需要PNG格式的favicon

由于浏览器兼容性，建议也提供PNG格式的图标：

**在线转换工具**:
1. [CloudConvert](https://cloudconvert.com/svg-to-png) - SVG转PNG
2. [RealFaviconGenerator](https://realfavicongenerator.net/) - 生成各平台favicon

**转换步骤**:
1. 访问 CloudConvert
2. 上传 `public/logo.svg`
3. 设置输出尺寸: 512x512, 256x256, 192x192, 180x180, 32x32, 16x16
4. 下载并保存到 `public/` 目录
5. 更新 `layout.tsx` 的 icons 配置

**推荐的图标尺寸**:
```
favicon.ico       - 16x16, 32x32, 48x48
favicon-16x16.png - 16x16
favicon-32x32.png - 32x32
apple-touch-icon.png - 180x180
android-chrome-192x192.png - 192x192
android-chrome-512x512.png - 512x512
```

## 🎯 设计理念

### 可爱 (Cute)
- 圆润的形状（心形、圆形）
- 柔和的线条
- 亲切的表情符号

### 温馨 (Warm)
- 暖色调为主（粉色、橙色、黄色）
- 渐变色营造温柔氛围
- 柔光效果

### 暖暖的 (Cozy)
- 舒适的背景色
- 适度的留白
- 流畅的动画过渡

## 📝 使用示例

### HTML中使用
```html
<img src="/logo.svg" alt="心灵陪伴" width="120" height="120" />
```

### CSS背景
```css
.logo {
  background-image: url('/logo.svg');
  background-size: contain;
  width: 120px;
  height: 120px;
}
```

### React组件
```tsx
<img 
  src="/logo.svg" 
  alt="心灵陪伴" 
  className="w-24 h-24 drop-shadow-lg"
/>
```

## 🔄 更新记录

- 2024: 初始设计 - Logo、Banner、OG图片
- 包含动画效果和渐变色系
- SVG格式，矢量无损缩放

---

💝 设计传达温暖与关怀，希望每位用户都能感受到陪伴的力量。

