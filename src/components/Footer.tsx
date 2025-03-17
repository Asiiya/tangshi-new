import { Layout, Typography, Space, Divider } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ 
      textAlign: 'center', 
      background: 'var(--secondary-color)', 
      padding: '24px',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="chinese-divider" style={{ marginBottom: 20 }}></div>
      
      <Space direction="vertical" size={12}>
        <Space align="center">
          <BookOutlined style={{ fontSize: 18, color: 'var(--primary-color)' }} />
          <Text strong className="text-gradient" style={{ fontSize: 16 }}>唐诗三百首</Text>
        </Space>
        
        <Text style={{ 
          display: 'block',
          fontFamily: 'KaiTi, STKaiti, serif',
          fontSize: 14
        }}>
          诗词之美，如山间清泉，润物无声
        </Text>
        
        <Text style={{ display: 'block' }}>©{new Date().getFullYear()} 学习与背诵应用</Text>
        
        <Space split={<Divider type="vertical" style={{ borderColor: 'var(--border-color)' }} />}>
          <Link href="#" target="_blank">关于我们</Link>
          <Link href="#" target="_blank">使用帮助</Link>
          <Link href="#" target="_blank">联系方式</Link>
        </Space>
        
        <Text type="secondary" style={{ fontSize: 12 }}>
          本应用仅供学习使用，内容来源于网络整理
        </Text>
      </Space>
      
      <div style={{ marginTop: 20 }}>
        <img 
          src="data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 C5,5 10,0 20,0 C30,0 35,5 40,10 C45,15 50,20 60,20 C70,20 75,15 80,10 C85,5 90,0 100,0' stroke='%238d192b' fill='none' stroke-width='1' stroke-opacity='0.3'/%3E%3C/svg%3E" 
          alt="decorative wave" 
          style={{ width: '100%', height: 20, opacity: 0.5 }}
        />
      </div>
    </AntFooter>
  );
};

export default Footer;