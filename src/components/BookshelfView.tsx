import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Poem } from '../data/poems';
import { Typography, Tooltip, Row, Col } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface BookshelfViewProps {
  poems: Poem[];
  title?: string;
  description?: string;
}

const BookshelfView: React.FC<BookshelfViewProps> = ({ 
  poems, 
  title = "诗词书架", 
  description = "浏览经典唐诗作品，点击可查看完整诗词内容。" 
}) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // 处理点击事件
  const handleItemClick = (poemId: number, index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedItem(index);
    
    // 添加水墨动画效果
    setTimeout(() => {
      const inkAnimation = document.createElement('div');
      inkAnimation.className = 'ink-animation';
      document.body.appendChild(inkAnimation);
      
      // 设置动画位置
      const rect = document.body.getBoundingClientRect();
      inkAnimation.style.left = `${rect.width / 2 - 50}px`;
      inkAnimation.style.top = `${rect.height / 2 - 50}px`;
      
      // 动画结束后移除元素并导航
      setTimeout(() => {
        document.body.removeChild(inkAnimation);
        setIsAnimating(false);
        setSelectedItem(null);
        navigate(`/poem/${poemId}`);
      }, 600);
    }, 300);
  };

  // 生成随机的样式
  const getRandomStyle = (index: number) => {
    const scrollColors = [
      'var(--primary-color)',
      'var(--jade-color)',
      'var(--bamboo-color)',
      'var(--ink-color)',
      '#8d6e63'
    ];
    
    const heights = [180, 190, 200];
    const widths = [120, 130, 140];
    
    const colorIndex = index % scrollColors.length;
    const heightIndex = index % heights.length;
    const widthIndex = index % widths.length;
    
    return {
      backgroundColor: scrollColors[colorIndex],
      height: `${heights[heightIndex]}px`,
      width: `${widths[widthIndex]}px`
    };
  };

  return (
    <div className="traditional-bookshelf-container">
      {title && <Title level={3} className="brush-title">{title}</Title>}
      {description && <p className="bookshelf-description">{description}</p>}
      
      <div className="traditional-bookshelf">
        <div className="bookshelf-section">
          <div className="section-title">
            <UnorderedListOutlined /> 卷轴珍藏
          </div>
          <Row gutter={[16, 16]} className="scroll-container">
            {poems.map((poem, index) => {
              const style = getRandomStyle(index);
              const isSelected = selectedItem === index;
              
              return (
                <Col xs={12} sm={8} md={6} lg={4} key={poem.id}>
                  <Tooltip title={`${poem.title} - ${poem.author}`} placement="top">
                    <div 
                      className={`scroll-item ${isSelected ? 'scroll-selected' : ''}`}
                      style={style}
                      onClick={() => handleItemClick(Number(poem.id), index)}
                    >
                      <div className="scroll-handle-top"></div>
                      <div className="scroll-content">
                        <div className="scroll-title">{poem.title}</div>
                        <div className="scroll-author">{poem.author}</div>
                      </div>
                      <div className="scroll-handle-bottom"></div>
                    </div>
                  </Tooltip>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BookshelfView; 