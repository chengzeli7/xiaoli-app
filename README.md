# 小梨 Ai 助手

一个简洁的个人灵感与任务管理 Web 应用。

## 功能特性

- 💡 **灵感记录** - 随时记录你的灵感和想法
- ✅ **任务管理** - 创建、编辑、完成你的任务
- 🏷️ **标签分类** - 用标签整理你的灵感
- 📊 **进度追踪** - 可视化你的任务完成进度
- 🌙 **深色模式** - 支持明暗主题切换
- ☁️ **云端同步** - 数据保存在 Supabase 云端

## 技术栈

- React + TypeScript
- Vite
- Tailwind CSS
- Zustand（状态管理）
- Supabase（后端数据库）
- Cloudflare Pages（部署）

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 部署

### Vercel（推荐）

```bash
vercel --prod
```

### Cloudflare Pages

```bash
wrangler pages deploy dist --project-name=xiaoli
```

## 项目结构

```
src/
├── components/     # UI 组件
├── pages/          # 页面组件
├── stores/         # 状态管理
├── supabase/       # 数据库配置
└── App.tsx         # 主应用
```

## 许可证

MIT