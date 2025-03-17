import { useEffect, useState } from 'react';
import { Typography, Row, Col, Empty } from 'antd';
import PoemCard from '../components/PoemCard';
import { Poem, poems } from '../data/poems';
import { getFavorites } from '../utils/favoriteUtils';

const { Title, Paragraph } = Typography;

const FavoritesPage = () => {
  const [favoritePoems, setFavoritePoems] = useState<Poem[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const favoriteIds = getFavorites();
      const poemsData = poems.filter(poem => favoriteIds.includes(poem.id));
      setFavoritePoems(poemsData);
    };

    loadFavorites();

    // 监听storage事件，当收藏变化时更新
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tangshi_favorites') {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 添加一个自定义事件监听器，用于在当前窗口更新收藏时刷新列表
  useEffect(() => {
    const handleFavoriteChange = () => {
      const favoriteIds = getFavorites();
      const poemsData = poems.filter(poem => favoriteIds.includes(poem.id));
      setFavoritePoems(poemsData);
    };

    window.addEventListener('favoriteChange', handleFavoriteChange);
    return () => {
      window.removeEventListener('favoriteChange', handleFavoriteChange);
    };
  }, []);

  return (
    <div>
      <Title level={2}>我的收藏</Title>
      <Paragraph style={{ marginBottom: 24 }}>
        这里保存了您收藏的所有唐诗，方便您随时查看和背诵。
      </Paragraph>

      {favoritePoems.length > 0 ? (
        <Row gutter={[16, 16]}>
          {favoritePoems.map(poem => (
            <Col xs={24} md={12} lg={8} key={poem.id}>
              <PoemCard poem={poem} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty 
          description="您还没有收藏任何诗歌" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};

export default FavoritesPage;