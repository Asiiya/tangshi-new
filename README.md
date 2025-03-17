# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
使用Vercel部署唐诗网站的详细步骤：
1. 准备工作
创建GitHub仓库
Apply to README.md
确保项目已构建成功
Apply to README.md
我们已经修复了所有TypeScript错误，构建成功生成了dist目录。
2. Vercel部署步骤
注册Vercel账号
访问 https://vercel.com/
使用GitHub账号直接登录（推荐）或创建新账号
导入项目
登录后点击"New Project"按钮
选择"Import Git Repository"
授权Vercel访问你的GitHub仓库
在列表中找到并选择你的唐诗网站仓库
配置部署设置
项目名称：可以使用默认的仓库名或自定义
框架预设：选择"Vite"
构建命令：npm run build
输出目录：dist
环境变量：本项目不需要设置环境变量
点击"Deploy"按钮
Vercel会自动拉取代码、安装依赖、构建项目并部署
部署过程通常只需1-2分钟
部署完成
部署成功后，Vercel会提供一个默认域名（如 tangshi-website.vercel.app）
你可以直接访问这个域名查看你的唐诗网站
3. 自定义域名（可选）
添加自定义域名
在项目仪表板中点击"Settings" → "Domains"
输入你拥有的域名（如 tangshi.yourdomain.com）
点击"Add"按钮
配置DNS记录
Vercel会提供DNS配置指南
通常需要添加一条CNAME记录，将你的域名指向Vercel提供的值
或者将域名的nameservers更改为Vercel的nameservers（推荐，可获得更好的性能）
4. 持续部署
Vercel会自动监听你的GitHub仓库变化：
每次推送到main分支，Vercel会自动重新部署
创建Pull Request时，Vercel会自动创建预览部署
你可以在Vercel仪表板查看所有部署历史
5. 其他有用的Vercel功能
分析：查看网站性能和访问统计
日志：查看构建和运行日志
环境：为不同环境（开发、预览、生产）设置不同的配置
团队协作：邀请团队成员共同管理项目
Vercel提供免费计划，对于个人项目完全足够，包括SSL证书、全球CDN和持续部署等功能。