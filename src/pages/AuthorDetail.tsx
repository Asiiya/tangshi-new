import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button, Empty, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PoemCard from '../components/PoemCard';
import { Poem, poems } from '../data/poems';

const { Title, Paragraph } = Typography;

// 作者简介（示例数据）
const authorInfo: Record<string, string> = {
  '李白': '李白（701年-762年），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。',
  '杜甫': '杜甫（712年-770年），字子美，自号少陵野老，唐代伟大的现实主义诗人，被后人誉为"诗圣"。',
  '王维': '王维（701年-761年），字摩诘，号摩诘居士，唐代著名诗人、画家，被后人誉为"诗佛"。',
  '孟浩然': '孟浩然（689年-740年），字浩然，号孟山人，唐代著名山水田园诗人。',
  '王之涣': '王之涣（688年-742年），字季凌，唐代著名诗人。'
};

const AuthorDetail = () => {
  const { author } = useParams<{ author: string }>();
  const navigate = useNavigate();
  const [authorPoems, setAuthorPoems] = useState<Poem[]>([]);

  useEffect(() => {
    if (author) {
      const filteredPoems = poems.filter(poem => 
        poem.author === author
      );
      setAuthorPoems(filteredPoems);
    }
  }, [author]);

  return (
    <div>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/authors')}
        style={{ marginBottom: 16 }}
      >
        返回作者列表
      </Button>
      
      <Title level={2}>作者: {author}</Title>
      
      {author && authorInfo[author] && (
        <Paragraph style={{ marginBottom: 24 }}>
          {authorInfo[author]}
        </Paragraph>
      )}
      
      <Divider orientation="left">作品列表</Divider>
      
      {authorPoems.length > 0 ? (
        <Row gutter={[16, 16]}>
          {authorPoems.map(poem => (
            <Col xs={24} md={12} lg={8} key={poem.id}>
              <PoemCard poem={poem} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={`没有找到作者为"${author}"的诗歌`} />
      )}
    </div>
  );
};

export default AuthorDetail;