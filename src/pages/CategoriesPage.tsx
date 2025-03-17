import { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { poems } from '../data/poems';

const { Title, Paragraph } = Typography;

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // 提取所有分类并计算每个分类的诗歌数量
    const allCategories = new Set<string>();
    const counts: Record<string, number> = {};
    
    poems.forEach(poem => {
      poem.categories.forEach(category => {
        allCategories.add(category);
        counts[category] = (counts[category] || 0) + 1;
      });
    });
    
    setCategories(Array.from(allCategories).sort());
    setCategoryCounts(counts);
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <div>
      <Title level={2}>诗歌分类</Title>
      <Paragraph style={{ marginBottom: 24 }}>
        唐诗按照内容和主题分为不同的类别，点击分类查看相关诗歌。
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        {categories.map(category => (
          <Col xs={12} sm={8} md={6} key={category}>
            <Card 
              hoverable 
              onClick={() => handleCategoryClick(category)}
              style={{ textAlign: 'center' }}
            >
              <Tag color="purple" style={{ fontSize: 16, padding: '4px 8px', margin: '8px 0' }}>
                {category}
              </Tag>
              <p>{categoryCounts[category] || 0} 首诗</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoriesPage;