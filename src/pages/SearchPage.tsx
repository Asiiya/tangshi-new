import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Input, Button, Empty } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import PoemCard from '../components/PoemCard';
import { Poem, poems } from '../data/poems';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Poem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchKeyword = params.get('keyword') || '';
    setKeyword(searchKeyword);
    
    if (searchKeyword) {
      const searchResults = poems.filter(poem => 
        poem.title.includes(searchKeyword) || 
        poem.author.includes(searchKeyword) || 
        poem.content.includes(searchKeyword)
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [location.search]);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <div>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ marginBottom: 16 }}
      >
        返回
      </Button>
      
      <Title level={2}>搜索结果</Title>
      
      <Search
        placeholder="搜索诗词..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onSearch={handleSearch}
        style={{ marginBottom: 24 }}
      />
      
      {results.length > 0 ? (
        <>
          <Paragraph>找到 {results.length} 首相关诗歌：</Paragraph>
          <Row gutter={[16, 16]}>
            {results.map(poem => (
              <Col xs={24} md={12} lg={8} key={poem.id}>
                <PoemCard poem={poem} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Empty 
          description={keyword ? `没有找到与"${keyword}"相关的诗歌` : '请输入关键词搜索'} 
        />
      )}
    </div>
  );
};

export default SearchPage;