import { Layout, Menu, Input, Space, Button, Tooltip, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOutlined, 
  SearchOutlined, 
  StarOutlined, 
  SoundOutlined,
  BulbOutlined,
  MenuOutlined,
  BgColorsOutlined,
  SettingOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Header: AntHeader } = Layout;
const { Search } = Input;

// 主题列表
const themes = [
  { key: 'default', name: '默认主题', className: '' },
  { key: 'jade', name: '青瓷主题', className: 'theme-jade' },
  { key: 'bamboo', name: '竹林主题', className: 'theme-bamboo' },
  { key: 'ink', name: '墨韵主题', className: 'theme-ink' },
  { key: 'autumn', name: '金秋主题', className: 'theme-autumn' }
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentTheme, setCurrentTheme] = useState('default');
  
  // 监听滚动事件，添加滚动效果
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // 从localStorage加载主题
    const savedTheme = localStorage.getItem('theme') || 'default';
    changeTheme(savedTheme);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(value.trim())}`);
    }
  };
  
  // 切换主题
  const changeTheme = (themeKey: string) => {
    // 移除所有主题类
    document.body.classList.remove(...themes.map(t => t.className).filter(Boolean));
    
    // 添加新主题类
    const theme = themes.find(t => t.key === themeKey);
    if (theme && theme.className) {
      document.body.classList.add(theme.className);
    }
    
    // 保存主题设置
    localStorage.setItem('theme', themeKey);
    setCurrentTheme(themeKey);
  };

  return (
    <AntHeader style={{ 
      background: 'var(--header-background)', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: scrolled ? '60px' : '64px',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(var(--header-background-rgb), 0.85)'
    }}>
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        <div style={{ 
          position: 'relative',
          marginRight: 15
        }}>
          <BookOutlined 
            style={{ 
              fontSize: 28, 
              color: '#fff',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }} 
          />
          <div style={{
            position: 'absolute',
            width: 8,
            height: 8,
            backgroundColor: 'var(--accent-color)',
            borderRadius: '50%',
            bottom: 0,
            right: 0
          }} />
        </div>
        <h1 
          className="brush-title"
          style={{ 
            margin: 0, 
            fontSize: 22, 
            color: '#fff',
            fontWeight: 600,
            letterSpacing: '2px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} 
        >
          唐诗三百首
        </h1>
      </div>
      
      <Space size="large">
        {/* 根据屏幕尺寸显示不同的菜单 */}
        {!isMobile ? (
          <Menu 
            mode="horizontal" 
            selectedKeys={[location.pathname]} 
            style={{ 
              border: 'none', 
              background: 'transparent',
              color: '#fff'
            }}
            items={[
              {
                key: '/',
                label: '首页',
                icon: <span style={{ fontSize: '0.8em', marginRight: 5 }}>🏠</span>,
                onClick: () => navigate('/')
              },
              {
                key: '/categories',
                label: '分类',
                icon: <span style={{ fontSize: '0.8em', marginRight: 5 }}>📚</span>,
                onClick: () => navigate('/categories')
              },
              {
                key: '/authors',
                label: '作者',
                icon: <span style={{ fontSize: '0.8em', marginRight: 5 }}>✒️</span>,
                onClick: () => navigate('/authors')
              },
              {
                key: '/favorites',
                label: '收藏',
                icon: <StarOutlined />,
                onClick: () => navigate('/favorites')
              },
              {
                key: '/stories',
                label: '儿童故事',
                icon: <ReadOutlined />,
                onClick: () => navigate('/stories')
              },
              {
                key: '/settings',
                label: '设置',
                icon: <SettingOutlined />,
                onClick: () => navigate('/settings')
              }
            ]}
            theme="dark"
          />
        ) : (
          <Dropdown
            menu={{
              items: [
                {
                  key: '/',
                  label: '首页',
                  icon: <span style={{ fontSize: '0.8em', marginRight: 5 }}>🏠</span>,
                  onClick: () => navigate('/')
                },
                {
                  key: '/categories',
                  label: '分类',
                  icon: <span style={{ fontSize: '0.8em', marginRight: 5 }}>📚</span>,
                  onClick: () => navigate('/categories')
                },
                {
                  key: '/authors',
                  label: '作者',
                  icon: <span style={{ fontSize: '0.8em', marginRight: 5 }}>✒️</span>,
                  onClick: () => navigate('/authors')
                },
                {
                  key: '/favorites',
                  label: '收藏',
                  icon: <StarOutlined />,
                  onClick: () => navigate('/favorites')
                },
                {
                  key: '/stories',
                  label: '儿童故事',
                  icon: <ReadOutlined />,
                  onClick: () => navigate('/stories')
                },
                {
                  key: '/settings',
                  label: '设置',
                  icon: <SettingOutlined />,
                  onClick: () => navigate('/settings')
                }
              ]
            }}
            placement="bottomRight"
          >
            <Button type="text" icon={<MenuOutlined style={{ color: '#fff' }} />} />
          </Dropdown>
        )}
        
        <Search
          placeholder="搜索诗词..."
          allowClear
          onSearch={handleSearch}
          style={{ 
            width: isMobile ? 150 : 220,
            borderRadius: 4
          }}
          enterButton={
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              style={{
                background: 'var(--accent-color)',
                borderColor: 'var(--accent-color)'
              }}
            />
          }
        />
        
        <Tooltip title="朗读模式">
          <Button 
            type="text" 
            icon={<SoundOutlined style={{ color: '#fff' }} />}
            onClick={() => navigate('/recite')}
          />
        </Tooltip>
        
        {/* 主题切换 */}
        <Dropdown
          menu={{
            items: themes.map(theme => ({
              key: theme.key,
              label: theme.name,
              onClick: () => changeTheme(theme.key)
            })),
            selectedKeys: [currentTheme]
          }}
          placement="bottomRight"
        >
          <Tooltip title="切换主题">
            <Button 
              type="text" 
              icon={<BgColorsOutlined style={{ color: '#fff' }} />}
            />
          </Tooltip>
        </Dropdown>
        
        <Tooltip title="夜间模式">
          <Button 
            type="text" 
            icon={<BulbOutlined style={{ color: '#fff' }} />}
            onClick={() => {
              document.body.classList.toggle('dark-mode');
            }}
          />
        </Tooltip>
      </Space>
    </AntHeader>
  );
};

export default Header;