import React, { useState, useRef, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Poem } from '../data/poems';

interface ScrollModeProps {
  poem: Poem;
  onClose?: () => void;
}

const ScrollMode: React.FC<ScrollModeProps> = ({ poem, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理全屏切换
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 处理滚动
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 300;
    const currentScroll = scrollRef.current.scrollLeft;
    const newPosition = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  // 格式化诗词内容
  const formatPoemContent = () => {
    const lines = poem.content.split(/[，。？！\n]/).filter(line => line.trim());
    
    return lines.map((line, index) => (
      <div 
        key={index}
        className="scroll-line"
      >
        {line.trim()}
        <span className="scroll-punctuation">
          {index < lines.length - 1 ? '，' : '。'}
        </span>
      </div>
    ));
  };

  return (
    <div 
      ref={containerRef}
      className={`scroll-mode-container ${isFullscreen ? 'fullscreen' : ''}`}
    >
      <div className="scroll-controls">
        <Tooltip title="向左滚动">
          <Button 
            icon={<LeftOutlined />} 
            onClick={() => handleScroll('left')}
            disabled={scrollPosition <= 0}
            shape="circle"
          />
        </Tooltip>
        
        <Tooltip title={isFullscreen ? "退出全屏" : "全屏模式"}>
          <Button 
            icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} 
            onClick={toggleFullscreen}
            shape="circle"
          />
        </Tooltip>
        
        <Tooltip title="向右滚动">
          <Button 
            icon={<RightOutlined />} 
            onClick={() => handleScroll('right')}
            shape="circle"
          />
        </Tooltip>
      </div>
      
      <div className="scroll-wrapper">
        <div 
          ref={scrollRef}
          className="scroll-content"
        >
          <div className="scroll-start-handle"></div>
          
          <div className="scroll-poem">
            <div className="scroll-title">{poem.title}</div>
            <div className="scroll-author">{poem.dynasty} · {poem.author}</div>
            <div className="scroll-text">
              {formatPoemContent()}
            </div>
          </div>
          
          <div className="scroll-end-handle"></div>
        </div>
      </div>
      
      {onClose && (
        <Button 
          className="scroll-close-btn"
          onClick={onClose}
        >
          返回普通模式
        </Button>
      )}
    </div>
  );
};

export default ScrollMode; 