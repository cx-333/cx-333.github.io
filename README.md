# 博士生个人学术主页

**[点击访问主页 → https://cx-333.github.io/](https://cx-333.github.io/)**

基于 React + Vite 的静态学术简历网站，包含个人简介、教育背景、技能、论文搜索与筛选、项目、荣誉、科研经历以及深浅色切换。

- [GitHub 仓库](https://github.com/cx-333/cx-333.github.io)
- [本地修改信息说明书](./本地修改信息说明书.md)
- [自动部署记录](https://github.com/cx-333/cx-333.github.io/actions)

## 本地运行

安装 Node.js 22.12 或更高的 22.x 版本及 Git，在项目目录执行：

```powershell
npm.cmd ci
npm.cmd run dev
```

打开终端显示的地址。发布前检查：

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

## 修改与发布

个人信息集中在 `src/App.jsx` 顶部的 `resumeData`；样式在 `src/App.css`；PDF 等静态附件放在 `public/`。当前页面包含示例资料，请按说明书替换。

```powershell
git add .
git commit -m "更新个人主页信息"
git push origin main
```

`main` 保存源码；GitHub Actions 验证并构建后将 `dist/` 发布到 `gh-pages`。Pages 发布源为 **Deploy from a branch → gh-pages → / (root)**。发布分支只保留最新构建，旧文件自动清理。日常修改无需强制推送，不要直接修改 `gh-pages` 或 `dist/`。

部署配置：`.github/workflows/gh-pages.yml`。首次迁移以本项目覆盖旧站，原 Hugo 网站历史不合并到新站分支。
