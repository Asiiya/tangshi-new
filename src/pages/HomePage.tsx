import { Typography, Row, Col, Card, Button, Tabs, Divider, Space } from 'antd';
import { BookOutlined, UserOutlined, TagsOutlined, FireOutlined, HistoryOutlined, ReadOutlined } from '@ant-design/icons';
import PoemCard from '../components/PoemCard';
import { poems } from '../data/poems';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookshelfView from '../components/BookshelfView';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const HomePage = () => {
  const navigate = useNavigate();
  const [dailyPoem, setDailyPoem] = useState<typeof poems[0] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  // 获取每日推荐诗词
  useEffect(() => {
    // 使用日期作为种子，确保每天推荐的诗词相同
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % poems.length;
    setDailyPoem(poems[index]);
    
    // 获取所有分类
    const allCategories = new Set<string>();
    poems.forEach(poem => {
      poem.categories.forEach(category => {
        allCategories.add(category);
      });
    });
    setCategories(Array.from(allCategories));
  }, []);
  
  // 获取特定分类的诗词
  const getPoemsByCategory = (category: string) => {
    return poems.filter(poem => poem.categories.includes(category));
  };

  return (
    <div>
      <div className="chinese-divider" style={{ marginBottom: 30 }}></div>
      
      {/* 每日推荐 */}
      <Card 
        className="paper-bg"
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FireOutlined style={{ color: 'var(--primary-color)', marginRight: 10 }} />
            <span className="brush-title" style={{ fontSize: 20 }}>每日推荐</span>
          </div>
        }
        style={{ marginBottom: 30 }}
      >
        {dailyPoem && (
          <Row gutter={24} align="middle">
            <Col xs={24} md={8}>
              <div style={{ 
                textAlign: 'center',
                padding: 20,
                background: 'var(--primary-color)',
                borderRadius: 8,
                color: 'white',
                boxShadow: 'var(--card-shadow)'
              }}>
                <Title level={3} style={{ color: 'white', margin: 0 }}>{dailyPoem.title}</Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{dailyPoem.dynasty} · {dailyPoem.author}</Text>
                <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '15px 0' }} />
                <Paragraph style={{ 
                  color: 'white',
                  fontFamily: 'FangSong, STFangsong, serif',
                  fontSize: 16,
                  lineHeight: 1.8,
                  marginBottom: 15
                }}>
                  {dailyPoem.content}
                </Paragraph>
                <Button 
                  type="default" 
                  ghost
                  onClick={() => navigate(`/poem/${dailyPoem.id}`)}
                >
                  查看详情
                </Button>
              </div>
            </Col>
            <Col xs={24} md={16}>
              <Title level={4} className="brush-title">译文赏析</Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                {dailyPoem.translation}
              </Paragraph>
              <div className="chinese-divider" style={{ margin: '15px 0' }}></div>
              <Space>
                {dailyPoem.categories.map(category => (
                  <Button 
                    key={category}
                    type="default"
                    onClick={() => navigate(`/category/${category}`)}
                    style={{ margin: '0 5px 5px 0' }}
                  >
                    {category}
                  </Button>
                ))}
              </Space>
            </Col>
          </Row>
        )}
      </Card>
      
      {/* 功能介绍 */}
      <Title level={3} className="brush-title">
        <BookOutlined style={{ marginRight: 10 }} />
        唐诗三百首
      </Title>
      <Paragraph style={{ marginBottom: 24, fontSize: 16 }}>
        欢迎使用唐诗三百首学习应用。这里收录了唐代经典诗歌，供您欣赏、学习和背诵。
      </Paragraph>

      <Row gutter={[16, 24]} style={{ marginBottom: 30 }}>
        <Col xs={24} md={8}>
          <Card 
            className="ink-card card-hover"
            onClick={() => navigate('/categories')}
            style={{ cursor: 'pointer', height: '100%' }}
          >
            <div style={{ textAlign: 'center' }}>
              <TagsOutlined style={{ fontSize: 36, color: 'var(--primary-color)' }} />
              <Title level={4} className="brush-title">分类查看</Title>
              <Paragraph>
                按照不同主题和内容分类查看诗歌，如山水、思乡、送别等。
              </Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card 
            className="ink-card card-hover"
            onClick={() => navigate('/authors')}
            style={{ cursor: 'pointer', height: '100%' }}
          >
            <div style={{ textAlign: 'center' }}>
              <UserOutlined style={{ fontSize: 36, color: 'var(--primary-color)' }} />
              <Title level={4} className="brush-title">诗人作品</Title>
              <Paragraph>
                浏览唐代著名诗人的作品，了解不同诗人的风格特点。
              </Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card 
            className="ink-card card-hover"
            onClick={() => navigate('/recite')}
            style={{ cursor: 'pointer', height: '100%' }}
          >
            <div style={{ textAlign: 'center' }}>
              <ReadOutlined style={{ fontSize: 36, color: 'var(--primary-color)' }} />
              <Title level={4} className="brush-title">朗读背诵</Title>
              <Paragraph>
                使用朗读功能辅助背诵，提高记忆效果和学习体验。
              </Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* 书架效果 */}
      <Title level={3} className="brush-title">
        <HistoryOutlined style={{ marginRight: 10 }} />
        诗词书架
      </Title>
      
      <Paragraph style={{ marginBottom: 20, fontSize: 16 }}>
        浏览经典唐诗作品，点击书脊可查看完整诗词内容。每本书代表一首经典诗作，不同颜色代表不同的诗歌风格。
      </Paragraph>
      
      <BookshelfView poems={poems.slice(0, 15)} />
      
      {/* 分类诗词 */}
      <Title level={3} className="brush-title">
        <TagsOutlined style={{ marginRight: 10 }} />
        分类精选
      </Title>
      
      <Tabs defaultActiveKey="0" tabPosition="top" style={{ marginBottom: 30 }}>
        {categories.slice(0, 5).map((category, index) => (
          <TabPane 
            tab={
              <span>
                <span style={{ fontSize: '0.8em', marginRight: 5 }}>📚</span>
                {category}
              </span>
            } 
            key={index.toString()}
          >
            <Row gutter={[16, 16]}>
              {getPoemsByCategory(category).slice(0, 6).map(poem => (
                <Col xs={24} md={12} lg={8} key={poem.id}>
                  <PoemCard poem={poem} />
                </Col>
              ))}
            </Row>
            
            {getPoemsByCategory(category).length > 6 && (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Button 
                  type="primary"
                  onClick={() => navigate(`/category/${category}`)}
                >
                  查看更多 {category} 诗词
                </Button>
              </div>
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default HomePage;