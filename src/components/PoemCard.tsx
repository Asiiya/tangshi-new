import React from 'react';
import { Card, Typography, Tag, Space, Divider, Tooltip, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Poem } from '../data/poems';
import { UserOutlined, SoundOutlined, StarOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

interface PoemCardProps {
  poem: Poem;
}

// 简单的汉字转拼音映射（实际项目中应使用完整的拼音库）
const pinyinMap: Record<string, string> = {
  '山': 'shān', '水': 'shuǐ', '风': 'fēng', '云': 'yún', '花': 'huā', '草': 'cǎo',
  '树': 'shù', '木': 'mù', '石': 'shí', '日': 'rì', '月': 'yuè', '星': 'xīng',
  '天': 'tiān', '地': 'dì', '人': 'rén', '家': 'jiā', '国': 'guó', '城': 'chéng',
  '春': 'chūn', '夏': 'xià', '秋': 'qiū', '冬': 'dōng', '江': 'jiāng', '河': 'hé',
  '湖': 'hú', '海': 'hǎi', '峰': 'fēng', '岭': 'lǐng', '谷': 'gǔ',
  '鸟': 'niǎo', '兽': 'shòu', '鱼': 'yú', '虫': 'chóng', '龙': 'lóng', '凤': 'fèng',
  '雨': 'yǔ', '雪': 'xuě', '霜': 'shuāng', '露': 'lù', '雾': 'wù', '冰': 'bīng',
  '火': 'huǒ', '烟': 'yān', '光': 'guāng', '影': 'yǐng', '声': 'shēng', '音': 'yīn',
  '色': 'sè', '香': 'xiāng', '味': 'wèi', '情': 'qíng', '思': 'sī', '意': 'yì',
  '爱': 'ài', '恨': 'hèn', '喜': 'xǐ', '怒': 'nù', '哀': 'āi', '乐': 'lè',
  '诗': 'shī', '词': 'cí', '曲': 'qǔ', '赋': 'fù', '文': 'wén', '章': 'zhāng',
  '道': 'dào', '德': 'dé', '礼': 'lǐ', '智': 'zhì',
  '信': 'xìn', '忠': 'zhōng', '孝': 'xiào', '悌': 'tì', '廉': 'lián', '耻': 'chǐ',
  '勇': 'yǒng', '毅': 'yì', '温': 'wēn', '良': 'liáng',
  '恭': 'gōng', '敬': 'jìng', '慈': 'cí'
};

const PoemCard: React.FC<PoemCardProps> = ({ poem }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);

  const handleClick = () => {
    // 添加水墨动画效果
    const inkAnimation = document.createElement('div');
    inkAnimation.className = 'ink-animation';
    document.body.appendChild(inkAnimation);
    
    // 设置动画位置
    const rect = document.body.getBoundingClientRect();
    inkAnimation.style.left = `${rect.width / 2 - 50}px`;
    inkAnimation.style.top = `${rect.height / 2 - 50}px`;
    
    // 动画结束后移除元素
    setTimeout(() => {
      document.body.removeChild(inkAnimation);
      navigate(`/poem/${poem.id}`);
    }, 600);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // 这里可以添加收藏功能的实现
  };

  const togglePinyin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPinyin(!showPinyin);
  };

  // 为汉字添加拼音
  const addPinyin = (text: string) => {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ 
          fontSize: '10px', 
          color: 'var(--light-text-color)', 
          marginBottom: '2px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {Array.from(text).map((char, idx) => (
            <span key={idx} style={{ display: 'inline-block', textAlign: 'center', width: '1em' }}>
              {pinyinMap[char] || ' '}
            </span>
          ))}
        </div>
        <div>{text}</div>
      </div>
    );
  };

  // 格式化诗词内容，每行一句并添加拼音
  const formatPoemContent = (content: string) => {
    // 按标点符号分割
    const lines = content.split(/[，。？！\n]/).filter(line => line.trim());
    
    return (
      <div style={{ textAlign: 'center' }}>
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          return (
            <div 
              key={index}
              style={{ 
                marginBottom: '16px',
                letterSpacing: '2px',
                lineHeight: '1.8'
              }}
            >
              {showPinyin ? addPinyin(trimmedLine) : trimmedLine}
              {index < lines.length - 1 ? (
                <span style={{ color: 'var(--light-text-color)' }}>
                  {content.includes('，') && index < lines.length - 1 ? '，' : '。'}
                </span>
              ) : (
                <span style={{ color: 'var(--light-text-color)' }}>。</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card 
      hoverable 
      className="paper-bg"
      style={{ 
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        boxShadow: isHovered ? 'var(--card-shadow)' : 'none'
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bodyStyle={{ padding: '20px' }}
    >
      <div style={{ position: 'relative' }}>
        <Title level={4} className="brush-title" style={{ 
          marginBottom: 8,
          color: 'var(--primary-color)',
          fontWeight: 600,
          textAlign: 'center'
        }}>{poem.title}</Title>
        
        <Space style={{ 
          marginBottom: 12, 
          display: 'flex', 
          justifyContent: 'center'
        }}>
          <UserOutlined style={{ color: 'var(--light-text-color)' }} />
          <Text type="secondary">{poem.dynasty} · {poem.author}</Text>
        </Space>
        
        <Divider className="chinese-divider" />
        
        <div 
          className="poem-content"
          style={{ 
            margin: '16px 0',
            fontSize: 16,
            lineHeight: 1.8,
            color: 'var(--text-color)',
            fontFamily: 'FangSong, STFangsong, serif'
          }}
        >
          {formatPoemContent(poem.content)}
        </div>
        
        <Space style={{ 
          marginTop: 16,
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Space>
            {poem.categories.map(category => (
              <Tag 
                key={category} 
                color="var(--primary-color)" 
                style={{ 
                  borderRadius: 16,
                  padding: '0 10px'
                }}
              >
                {category}
              </Tag>
            ))}
          </Space>
          
          <Space>
            <Tooltip title={showPinyin ? "隐藏拼音" : "显示拼音"}>
              <Button 
                type="text" 
                size="small" 
                icon={<span style={{ fontSize: '0.8em', marginRight: 5 }}>拼</span>} 
                onClick={togglePinyin}
                style={{ 
                  color: showPinyin ? 'var(--primary-color)' : undefined,
                  fontWeight: showPinyin ? 'bold' : 'normal'
                }}
              />
            </Tooltip>
            
            <Tooltip title="朗读">
              <Button 
                type="text" 
                size="small" 
                icon={<SoundOutlined />} 
                onClick={(e) => {
                  e.stopPropagation();
                  // 这里可以添加朗读功能
                }}
              />
            </Tooltip>
            
            <Tooltip title={isFavorite ? "取消收藏" : "收藏"}>
              <Button 
                type="text" 
                size="small" 
                icon={<StarOutlined style={{ color: isFavorite ? 'var(--accent-color)' : undefined }} />} 
                onClick={toggleFavorite}
              />
            </Tooltip>
          </Space>
        </Space>
        
        {/* 印章效果 - 仅在悬停时显示 */}
        {isHovered && (
          <div 
            className="stamp" 
            style={{ 
              position: 'absolute', 
              top: 10, 
              right: 10,
              fontSize: 14,
              padding: 4,
              opacity: 0.8
            }}
          >
            赏
          </div>
        )}
      </div>
    </Card>
  );
};

export default PoemCard;