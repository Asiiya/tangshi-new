import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && savedTheme !== 'default') {
    document.body.classList.add(`theme-${savedTheme}`);
  }
};

// 执行主题初始化
initTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
