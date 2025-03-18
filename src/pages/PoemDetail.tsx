import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, Button, Divider, Space, message, Tooltip, Collapse } from 'antd';
import { ArrowLeftOutlined, StarOutlined, StarFilled, BookOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Poem, poems } from '../data/poems';
import { isFavorite, toggleFavorite } from '../utils/favoriteUtils';
import ReciteMode from '../components/ReciteMode';
import ScrollMode from '../components/ScrollMode';
import PoemIllustration from '../components/PoemIllustration';
import SpeechControls from '../components/SpeechControls';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const PoemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [favorite, setFavorite] = useState(false);
  const [reciteMode, setReciteMode] = useState(false);
  const [scrollMode, setScrollMode] = useState(false);
  const [showSpeechControls, setShowSpeechControls] = useState(false);

  useEffect(() => {
    if (id) {
      const foundPoem = poems.find(p => p.id === id);
      setPoem(foundPoem || null);
      setFavorite(isFavorite(id));
    }
  }, [id]);

  const handleFavoriteClick = () => {
    if (!id) return;
    
    const newState = toggleFavorite(id);
    setFavorite(newState);
    message.success(newState ? '已添加到收藏' : '已从收藏中移除');
  };

  const handleReciteClick = () => {
    setReciteMode(true);
  };

  const handleScrollModeClick = () => {
    setScrollMode(true);
  };

  const toggleSpeechControls = () => {
    setShowSpeechControls(!showSpeechControls);
  };

  // 格式化诗词文本用于朗读
  const getFormattedTextForSpeech = () => {
    if (!poem) return '';
    
    let result = `${poem.title}，${poem.dynasty}代，${poem.author}。`;
    
    // 将诗词内容中的标点符号替换为语音暂停
    const content = poem.content.replace(/[，。！？、]/g, match => `${match}，`);
    result += content;
    
    return result;
  };

  if (!poem) {
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
        <Card>
          <Title level={4}>未找到诗歌</Title>
          <Paragraph>抱歉，未找到ID为 {id} 的诗歌。</Paragraph>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        返回
      </Button>
      
      {!scrollMode ? (
        <Card>
          <Title level={2} style={{ textAlign: 'center' }}>{poem.title}</Title>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Text type="secondary">{poem.dynasty} · {poem.author}</Text>
            <Space style={{ marginLeft: 16 }}>
              <Button 
                type="text" 
                icon={favorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />} 
                onClick={handleFavoriteClick}
              >
                {favorite ? '取消收藏' : '收藏'}
              </Button>
              <Button 
                type="text" 
                icon={<BookOutlined />} 
                onClick={handleReciteClick}
              >
                背诵模式
              </Button>
              <Tooltip title="卷轴模式">
                <Button 
                  type="text" 
                  icon={<UnorderedListOutlined />} 
                  onClick={handleScrollModeClick}
                >
                  卷轴模式
                </Button>
              </Tooltip>
            </Space>
          </div>
          
          <Paragraph 
            style={{ 
              fontSize: 18, 
              lineHeight: 2, 
              textAlign: 'center',
              whiteSpace: 'pre-line',
              marginBottom: 24
            }}
          >
            {poem.content}
          </Paragraph>
          
          <Space style={{ marginBottom: 16 }}>
            {poem.categories.map(category => (
              <Button 
                key={category} 
                type="text"
                onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
              >
                {category}
              </Button>
            ))}
          </Space>
          
          <Divider />
          
          <Collapse>
            <Panel header="朗读设置" key="1">
              <SpeechControls text={getFormattedTextForSpeech()} />
            </Panel>
          </Collapse>
          
          {poem.translation && (
            <>
              <Divider orientation="left">译文</Divider>
              <Paragraph>{poem.translation}</Paragraph>
            </>
          )}
          
          <PoemIllustration poem={poem} />
        </Card>
      ) : (
        <ScrollMode poem={poem} onClose={() => setScrollMode(false)} />
      )}

      {poem && (
        <ReciteMode 
          poem={poem} 
          visible={reciteMode} 
          onClose={() => setReciteMode(false)} 
        />
      )}
    </div>
  );
};

export default PoemDetail;