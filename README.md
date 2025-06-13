# ZLMediaKit 前端演示项目

这是一个基于 Vue 3 + TypeScript + Vite 构建的 ZLMediaKit 前端演示项目，用于展示视频流播放功能。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Element Plus
- HLS.js
- WSPlayer

## 功能特性

- 支持 WebSocket 视频流播放
- 支持 HLS 视频流播放
- 响应式设计
- 现代化 UI 界面

## 注意事项

- 确保 WebSocket 服务器地址配置正确
- 视频播放需要浏览器支持 WebSocket 和 HLS 协议
- 建议使用现代浏览器访问以获得最佳体验
- 请勿将包含实际配置的 `src/config/index.ts` 文件提交到版本控制系统
- WebRTCPlayer 组件是失败的尝试，因为 ZLM 服务器没有提供 WebSocket 接口，请使用 WSPlayer 或 HLS 播放器

## 安装

1. 确保已安装 Node.js (推荐 v16 或更高版本)
2. 克隆项目
```bash
git clone [项目地址]
cd zlmedia-frontend-demo
```

3. 安装依赖
```bash
pnpm install
```

4. 配置
```bash
# 复制配置文件模板
cp src/config/config.template.ts src/config/index.ts
# 编辑 src/config/index.ts 文件，填入您的配置信息
```

## 开发

```bash
pnpm dev
```

## 构建

```bash
pnpm build
```

## 预览构建结果

```bash
pnpm preview
```

## 项目结构

```
├── public/          # 静态资源
├── src/             # 源代码
│   ├── components/  # 组件
│   ├── config/      # 配置文件
│   │   ├── index.ts           # 实际配置文件
│   │   └── config.template.ts # 配置模板
│   └── ...
├── index.html       # 入口 HTML
└── vite.config.ts   # Vite 配置
```

## 许可证

[MIT](LICENSE)
