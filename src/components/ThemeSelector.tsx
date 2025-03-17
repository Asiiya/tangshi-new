import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// 主题列表
const themes = [
  { key: 'default', name: '默认主题', className: '', primaryColor: '#8d192b', bgColor: '#f9f6f2' },
  { key: 'jade', name: '青瓷主题', className: 'theme-jade', primaryColor: '#3a5c6e', bgColor: '#f5f9fb' },
  { key: 'bamboo', name: '竹林主题', className: 'theme-bamboo', primaryColor: '#7a8b50', bgColor: '#f8faf3' },
  { key: 'ink', name: '墨韵主题', className: 'theme-ink', primaryColor: '#1c2c39', bgColor: '#fafafa' },
  { key: 'autumn', name: '金秋主题', className: 'theme-autumn', primaryColor: '#c0392b', bgColor: '#fefbf3' }
];

const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  
  useEffect(() => {
    // 从localStorage加载主题
    const savedTheme = localStorage.getItem('theme') || 'default';
    setCurrentTheme(savedTheme);
  }, []);
  
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
    <div>
      <Title level={4} className="brush-title" style={{ textAlign: 'center', marginBottom: 20 }}>
        主题选择
      </Title>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
        {themes.map(theme => (
          <Card
            key={theme.key}
            hoverable
            style={{ 
              width: 150, 
              borderColor: currentTheme === theme.key ? theme.primaryColor : 'var(--border-color)',
              borderWidth: currentTheme === theme.key ? 2 : 1,
              position: 'relative',
              overflow: 'hidden'
            }}
            bodyStyle={{ 
              padding: 12,
              backgroundColor: theme.bgColor
            }}
            onClick={() => changeTheme(theme.key)}
          >
            {currentTheme === theme.key && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: theme.primaryColor,
                color: 'white',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomLeftRadius: 8
              }}>
                <CheckOutlined />
              </div>
            )}
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%',
                height: 40,
                backgroundColor: theme.primaryColor,
                borderRadius: 4,
                marginBottom: 8
              }} />
              
              <Text strong style={{ color: theme.primaryColor }}>
                {theme.name}
              </Text>
              
              <div style={{
                display: 'flex',
                marginTop: 8,
                gap: 4,
                justifyContent: 'center'
              }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: theme.primaryColor }} />
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: theme.bgColor, border: `1px solid ${theme.primaryColor}` }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Text type="secondary">
          选择适合您阅读习惯的主题，提高文字清晰度和阅读体验
        </Text>
      </div>
    </div>
  );
};

export default ThemeSelector; 