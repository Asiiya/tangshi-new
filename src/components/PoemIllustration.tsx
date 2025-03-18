import React, { useState, useEffect } from 'react';
import { Card, Image, Typography, Spin, Button } from 'antd';
import { Poem } from '../data/poems';
import { PictureOutlined, ReloadOutlined } from '@ant-design/icons';

const { Text } = Typography;

// 更新的诗词关键词到图片的映射（使用稳定的CDN图片链接）
const keywordImageMap: Record<string, string[]> = {
  '山': [
    'https://wallpaperaccess.com/full/800309.jpg',
    'https://png.pngtree.com/background/20230612/original/pngtree-high-mountains-chinese-style-ink-painting-picture-image_3176896.jpg'
  ],
  '水': [
    'https://img.freepik.com/free-photo/beautiful-scenery-summit-mount-everest-covered-with-snow-white-clouds_181624-21317.jpg',
    'https://png.pngtree.com/background/20230612/original/pngtree-chinese-style-ink-landscape-picture-image_3176898.jpg'
  ],
  '月': [
    'https://wallpaperaccess.com/full/1403923.jpg',
    'https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-hand-painted-moon-mountains-chinese-style-ink-landscape-picture-image_2906070.jpg'
  ],
  '花': [
    'https://wallpaperaccess.com/full/1624848.jpg',
    'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'
  ],
  '鸟': [
    'https://wallpaperaccess.com/full/1294117.jpg',
    'https://png.pngtree.com/background/20230612/original/pngtree-ink-landscape-painting-of-a-bird-flying-over-mountains-picture-image_3176955.jpg'
  ],
  '风': [
    'https://wallpaperaccess.com/full/1294166.jpg',
    'https://img.freepik.com/free-photo/chinese-painting-scenery-landscape-background_53876-130924.jpg'
  ],
  '雨': [
    'https://wallpaperaccess.com/full/1624845.jpg',
    'https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-ink-painting-of-mountain-and-river-with-chinese-style-decoration-picture-image_2906246.jpg'
  ],
  '云': [
    'https://wallpaperaccess.com/full/3932235.jpg',
    'https://img.freepik.com/free-photo/painting-lake-with-mountain-scenery_188544-9131.jpg'
  ],
  '雪': [
    'https://wallpaperaccess.com/full/1294156.jpg',
    'https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-landscape-painting-of-mountains-and-rivers-in-chinese-style-ink-picture-image_2906247.jpg'
  ],
  '日': [
    'https://wallpaperaccess.com/full/1624851.jpg',
    'https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-chinese-style-ink-landscape-picture-image_2883782.jpg'
  ]
};

// 默认图片，当没有匹配的关键词时使用
const defaultImages = [
  'https://wallpaperaccess.com/full/1624854.jpg',
  'https://img.freepik.com/free-photo/painting-mountain-landscape-with-high-rocky-mountains-sunset_188544-9126.jpg',
  'https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-ink-drawing-of-a-mountain-landscape-with-chinese-style-decoration-picture-image_2906245.jpg'
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