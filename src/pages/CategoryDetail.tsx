import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PoemCard from '../components/PoemCard';
import { Poem, poems } from '../data/poems';

const { Title, Paragraph } = Typography;

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [categoryPoems, setCategoryPoems] = useState<Poem[]>([]);

  useEffect(() => {
    if (category) {
      const filteredPoems = poems.filter(poem => 
        poem.categories.includes(category)
      );
      setCategoryPoems(filteredPoems);
    }
  }, [category]);

  return (
    <div>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/categories')}
        style={{ marginBottom: 16 }}
      >
        返回分类
      </Button>
      
      <Title level={2}>分类: {category}</Title>
      <Paragraph style={{ marginBottom: 24 }}>
        以下是属于"{category}"分类的诗歌，共 {categoryPoems.length} 首。
      </Paragraph>
      
      {categoryPoems.length > 0 ? (
        <Row gutter={[16, 16]}>
          {categoryPoems.map(poem => (
            <Col xs={24} md={12} lg={8} key={poem.id}>
              <PoemCard poem={poem} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={`没有找到属于"${category}"分类的诗歌`} />
      )}
    </div>
  );
};

export default CategoryDetail;