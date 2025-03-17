import React from 'react';
import { Typography, Divider, Card } from 'antd';
import ThemeSelector from '../components/ThemeSelector';

const { Title } = Typography;

const SettingsPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '20px 0' }}>
      <div className="page-header">
        <Title level={2} className="brush-title">设置</Title>
        <Divider className="custom-divider" />
      </div>
      
      <Card 
        className="settings-card"
        style={{ 
          maxWidth: 800, 
          margin: '0 auto',
          boxShadow: 'var(--card-shadow)',
          borderRadius: 8,
          border: '1px solid var(--border-color)'
        }}
      >
        <ThemeSelector />
        
        <Divider className="custom-divider" />
        
        {/* 可以在这里添加更多设置选项 */}
      </Card>
    </div>
  );
};

export default SettingsPage; 