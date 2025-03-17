import React, { useState, useEffect } from 'react';
import { Card, Image, Typography, Spin, Button } from 'antd';
import { Poem } from '../data/poems';
import { PictureOutlined, ReloadOutlined } from '@ant-design/icons';

const { Text } = Typography;

// 模拟的诗词关键词到图片的映射
const keywordImageMap: Record<string, string[]> = {
  '山': [
    'https://img.zcool.cn/community/01f9ea5af3f64ca801216045404549.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/0183465b02f77aa801219c77f1f58f.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '水': [
    'https://img.zcool.cn/community/01f4c75af3f64ca801216045a9c4a0.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01a0c85af3f64ca8012160454b7f9d.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '月': [
    'https://img.zcool.cn/community/031f2f75af3f64ca801216045e7c2c9.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01f9ea5af3f64ca801216045404549.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '花': [
    'https://img.zcool.cn/community/01f4c75af3f64ca801216045a9c4a0.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01a0c85af3f64ca8012160454b7f9d.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '鸟': [
    'https://img.zcool.cn/community/031f2f75af3f64ca801216045e7c2c9.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01f9ea5af3f64ca801216045404549.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '风': [
    'https://img.zcool.cn/community/01f4c75af3f64ca801216045a9c4a0.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01a0c85af3f64ca8012160454b7f9d.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '雨': [
    'https://img.zcool.cn/community/031f2f75af3f64ca801216045e7c2c9.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01f9ea5af3f64ca801216045404549.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '云': [
    'https://img.zcool.cn/community/01f4c75af3f64ca801216045a9c4a0.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01a0c85af3f64ca8012160454b7f9d.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '雪': [
    'https://img.zcool.cn/community/031f2f75af3f64ca801216045e7c2c9.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01f9ea5af3f64ca801216045404549.jpg@1280w_1l_2o_100sh.jpg'
  ],
  '日': [
    'https://img.zcool.cn/community/01f4c75af3f64ca801216045a9c4a0.jpg@1280w_1l_2o_100sh.jpg',
    'https://img.zcool.cn/community/01a0c85af3f64ca8012160454b7f9d.jpg@1280w_1l_2o_100sh.jpg'
  ]
};

// 默认图片，当没有匹配的关键词时使用
const defaultImages = [
  'https://img.zcool.cn/community/01f9ea5af3f64ca801216045404549.jpg@1280w_1l_2o_100sh.jpg',
  'https://img.zcool.cn/community/01f4c75af3f64ca801216045a9c4a0.jpg@1280w_1l_2o_100sh.jpg',
  'https://img.zcool.cn/community/031f2f75af3f64ca801216045e7c2c9.jpg@1280w_1l_2o_100sh.jpg'
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