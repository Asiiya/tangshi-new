import { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { poems } from '../data/poems';

const { Title, Paragraph, Text } = Typography;

const AuthorsPage = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<{name: string, count: number}[]>([]);

  useEffect(() => {
    // 提取所有作者并计算每个作者的诗歌数量
    const authorCounts: Record<string, number> = {};
    
    poems.forEach(poem => {
      authorCounts[poem.author] = (authorCounts[poem.author] || 0) + 1;
    });
    
    const authorList = Object.entries(authorCounts).map(([name, count]) => ({
      name,
      count
    })).sort((a, b) => b.count - a.count);
    
    setAuthors(authorList);
  }, []);

  const handleAuthorClick = (author: string) => {
    navigate(`/author/${encodeURIComponent(author)}`);
  };

  return (
    <div>
      <Title level={2}>诗人列表</Title>
      <Paragraph style={{ marginBottom: 24 }}>
        唐代著名诗人及其作品数量，点击查看诗人的作品。
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        {authors.map(author => (
          <Col xs={12} sm={8} md={6} key={author.name}>
            <Card 
              hoverable 
              onClick={() => handleAuthorClick(author.name)}
              style={{ textAlign: 'center' }}
            >
              <Avatar 
                size={64} 
                icon={<UserOutlined />} 
                style={{ backgroundColor: '#722ed1', marginBottom: 12 }} 
              />
              <Title level={5}>{author.name}</Title>
              <Text type="secondary">{author.count} 首诗</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AuthorsPage;