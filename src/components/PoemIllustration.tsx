import React, { useState, useEffect } from 'react';
import { Card, Image, Typography, Spin, Button } from 'antd';
import { Poem } from '../data/poems';
import { PictureOutlined, ReloadOutlined } from '@ant-design/icons';

const { Text } = Typography;

// 更新的诗词关键词到图片的映射（使用更可靠的图片链接）
const keywordImageMap: Record<string, string[]> = {
  '山': [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?auto=format&fit=crop&w=1080'
  ],
  '水': [
    'https://images.unsplash.com/photo-1500829243541-74b677fecc30?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1080'
  ],
  '月': [
    'https://images.unsplash.com/photo-1514912885225-5c9ec8507d68?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?auto=format&fit=crop&w=1080'
  ],
  '花': [
    'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1518634534903-0c1bd3a5c9f7?auto=format&fit=crop&w=1080'
  ],
  '鸟': [
    'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1593528858476-a95ccf1d8abb?auto=format&fit=crop&w=1080'
  ],
  '风': [
    'https://images.unsplash.com/photo-1519303463695-12b123bb018f?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1505672678657-cc7037095e60?auto=format&fit=crop&w=1080'
  ],
  '雨': [
    'https://images.unsplash.com/photo-1528484701073-2b96fa89ea3d?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?auto=format&fit=crop&w=1080'
  ],
  '云': [
    'https://images.unsplash.com/photo-1505533321630-975218a5f66f?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1080'
  ],
  '雪': [
    'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1550155864-68938942e2f1?auto=format&fit=crop&w=1080'
  ],
  '日': [
    'https://images.unsplash.com/photo-1547284902-d947a54268e1?auto=format&fit=crop&w=1080',
    'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1080'
  ]
};

// 默认图片，当没有匹配的关键词时使用
const defaultImages = [
  'https://images.unsplash.com/photo-1571832743254-3def2e38ef87?auto=format&fit=crop&w=1080',
  'https://images.unsplash.com/photo-1517309246852-c865addbbeff?auto=format&fit=crop&w=1080',
  'https://images.unsplash.com/photo-1518397823582-be54e5fda62d?auto=format&fit=crop&w=1080'
];

interface PoemIllustrationProps {
  poem: Poem;
}

const PoemIllustration: React.FC<PoemIllustrationProps> = ({ poem }) => {
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  // 根据诗词内容选择合适的图片
  const selectImage = () => {
    setLoading(true);
    
    // 从诗词内容中提取关键词
    const keywords = Object.keys(keywordImageMap);
    const matchedKeywords: string[] = [];
    
    keywords.forEach(keyword => {
      if (poem.content.includes(keyword)) {
        matchedKeywords.push(keyword);
      }
    });
    
    // 如果有匹配的关键词，随机选择一个
    let selectedKeyword = '';
    let selectedImage = '';
    
    if (matchedKeywords.length > 0) {
      selectedKeyword = matchedKeywords[Math.floor(Math.random() * matchedKeywords.length)];
      const images = keywordImageMap[selectedKeyword];
      selectedImage = images[Math.floor(Math.random() * images.length)];
    } else {
      // 如果没有匹配的关键词，使用默认图片
      selectedImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
    }
    
    // 设置图片和标题
    setImageUrl(selectedImage);
    setImageTitle(selectedKeyword ? `诗中意境：${selectedKeyword}` : '诗词意境图');
    
    // 模拟加载时间
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // 初始化时选择图片
  useEffect(() => {
    selectImage();
  }, [poem]);

  return (
    <Card 
      className="poem-illustration-card"
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            <PictureOutlined style={{ marginRight: 8 }} />
            水墨意境
          </span>
          <Button 
            icon={<ReloadOutlined />} 
            size="small" 
            onClick={selectImage}
            disabled={loading}
          >
            换一张
          </Button>
        </div>
      }
      style={{ marginTop: 20 }}
    >
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: 300
        }}>
          <Spin tip="正在生成水墨画..." />
        </div>
      ) : (
        <div className="illustration-container">
          <Image 
            src={imageUrl} 
            alt={imageTitle}
            style={{ 
              width: '100%', 
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 4
            }}
            preview={{
              mask: <div>
                <PictureOutlined style={{ marginRight: 8 }} />
                查看大图
              </div>
            }}
          />
          <div className="illustration-caption">
            <Text>{imageTitle}</Text>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PoemIllustration; 