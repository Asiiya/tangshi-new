import { Layout, ConfigProvider, theme } from 'antd'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'

// 导入组件
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PoemDetail from './pages/PoemDetail'
import SearchPage from './pages/SearchPage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetail from './pages/CategoryDetail'
import AuthorsPage from './pages/AuthorsPage'
import AuthorDetail from './pages/AuthorDetail'
import FavoritesPage from './pages/FavoritesPage'
import RecitePage from './pages/RecitePage'
import SettingsPage from './pages/SettingsPage'

const { Content } = Layout

// 页面过渡动画组件
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('page-transition-enter');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'page-transition-enter') {
      setTransitionStage('');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={transitionStage}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 监听夜间模式变化
  useEffect(() => {
    const handleDarkModeChange = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    // 创建一个MutationObserver来监听body类名的变化
    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#8d192b',
          colorSuccess: '#7a8b50',
          colorWarning: '#d4b106',
          colorError: '#a02c2c',
          colorInfo: '#3a5c6e',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout style={{ 
            padding: '24px',
            background: 'var(--background-color)'
          }}>
            <Content
              className="container"
              style={{
                background: '#fff',
                padding: 24,
                margin: '0 auto',
                borderRadius: 12,
                minHeight: 280,
                boxShadow: 'var(--card-shadow)',
                maxWidth: 1200
              }}
            >
              <PageTransition>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/poem/:id" element={<PoemDetail />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/category/:category" element={<CategoryDetail />} />
                  <Route path="/authors" element={<AuthorsPage />} />
                  <Route path="/author/:author" element={<AuthorDetail />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/recite" element={<RecitePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </PageTransition>
            </Content>
          </Layout>
          <Footer />
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

export default App