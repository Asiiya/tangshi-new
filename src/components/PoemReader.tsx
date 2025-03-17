import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Space, Tooltip, Slider, Card } from 'antd';
import { SoundOutlined, PauseOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Poem } from '../data/poems';

const { Title, Paragraph, Text } = Typography;

interface PoemReaderProps {
  poem: Poem;
}

const PoemReader: React.FC<PoemReaderProps> = ({ poem }) => {
  const [isReading, setIsReading] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [readingSpeed, setReadingSpeed] = useState(500); // 毫秒/字
  const [showSettings, setShowSettings] = useState(false);
  const [characters, setCharacters] = useState<string[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // 初始化诗词内容
  useEffect(() => {
    // 按标点符号分割成行
    const newLines = poem.content.split(/[，。？！\n]/).filter(line => line.trim());
    setLines(newLines);
    
    // 将所有字符放入数组
    const allChars: string[] = [];
    let lineStartIndices: number[] = [0];
    let currentIndex = 0;
    
    newLines.forEach((line, lineIndex) => {
      const lineChars = Array.from(line.trim());
      allChars.push(...lineChars);
      
      // 添加标点符号
      if (lineIndex < newLines.length - 1) {
        allChars.push('，');
      } else {
        allChars.push('。');
      }
      
      currentIndex += lineChars.length + 1;
      if (lineIndex < newLines.length - 1) {
        lineStartIndices.push(currentIndex);
      }
    });
    
    setCharacters(allChars);
    
    // 重置状态
    setCurrentCharIndex(-1);
    setCurrentLineIndex(0);
    setIsReading(false);
    
    // 清除定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [poem]);

  // 开始或暂停朗读
  const toggleReading = () => {
    if (isReading) {
      // 暂停朗读
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsReading(false);
    } else {
      // 开始朗读
      setIsReading(true);
      
      // 如果已经读完，从头开始
      if (currentCharIndex >= characters.length - 1) {
        setCurrentCharIndex(-1);
        setCurrentLineIndex(0);
      }
      
      // 设置定时器，逐字朗读
      timerRef.current = setInterval(() => {
        setCurrentCharIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          
          // 检查是否需要更新当前行
          if (nextIndex >= 0) {
            // 找到当前字符所在的行
            let lineIndex = 0;
            let charCount = 0;
            
            for (let i = 0; i < lines.length; i++) {
              charCount += lines[i].length + 1; // +1 是标点符号
              if (nextIndex < charCount) {
                lineIndex = i;
                break;
              }
            }
            
            if (lineIndex !== currentLineIndex) {
              setCurrentLineIndex(lineIndex);
              
              // 滚动到当前行
              if (containerRef.current) {
                const lineElements = containerRef.current.querySelectorAll('.poem-line');
                if (lineElements[lineIndex]) {
                  lineElements[lineIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }
              }
            }
          }
          
          // 检查是否读完
          if (nextIndex >= characters.length - 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setIsReading(false);
            return characters.length - 1;
          }
          
          return nextIndex;
        });
      }, readingSpeed);
    }
  };

  // 重置朗读
  const resetReading = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrentCharIndex(-1);
    setCurrentLineIndex(0);
    setIsReading(false);
  };

  // 生成水墨动画效果
  const renderInkEffect = (index: number) => {
    if (index !== currentCharIndex) return null;
    
    return (
      <div 
        className="ink-ripple" 
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: -1,
          animation: 'ink-ripple 2s ease-out'
        }}
      />
    );
  };

  // 渲染诗词内容
  const renderPoemContent = () => {
    return (
      <div ref={containerRef} className="poem-reader-content">
        {lines.map((line, lineIndex) => {
          const lineChars = Array.from(line);
          
          return (
            <div 
              key={lineIndex} 
              className={`poem-line ${lineIndex === currentLineIndex ? 'current-line' : ''}`}
              style={{
                marginBottom: '20px',
                position: 'relative',
                textAlign: 'center',
                padding: '10px',
                borderRadius: '8px',
                background: lineIndex === currentLineIndex ? 'rgba(var(--primary-color-rgb), 0.05)' : 'transparent',
                transition: 'background 0.3s ease'
              }}
            >
              {lineChars.map((char, charIndex) => {
                // 计算全局字符索引
                let globalCharIndex = 0;
                for (let i = 0; i < lineIndex; i++) {
                  globalCharIndex += lines[i].length + 1; // +1 是标点符号
                }
                globalCharIndex += charIndex;
                
                const isCurrentChar = globalCharIndex === currentCharIndex;
                
                return (
                  <span 
                    key={charIndex}
                    className={`poem-char ${isCurrentChar ? 'current-char' : ''}`}
                    style={{
                      display: 'inline-block',
                      fontSize: '20px',
                      margin: '0 5px',
                      position: 'relative',
                      color: isCurrentChar ? 'var(--primary-color)' : 'var(--text-color)',
                      fontWeight: isCurrentChar ? 'bold' : 'normal',
                      textShadow: isCurrentChar ? '0 0 5px rgba(var(--primary-color-rgb), 0.3)' : 'none',
                      transition: 'color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease',
                      transform: isCurrentChar ? 'scale(1.2)' : 'scale(1)'
                    }}
                  >
                    {char}
                    {renderInkEffect(globalCharIndex)}
                  </span>
                );
              })}
              
              {/* 添加标点符号 */}
              <span 
                style={{ 
                  color: 'var(--light-text-color)',
                  marginLeft: '5px'
                }}
              >
                {lineIndex < lines.length - 1 ? '，' : '。'}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="poem-reader-card paper-bg">
      <Title level={4} className="brush-title" style={{ textAlign: 'center', marginBottom: 20 }}>
        {poem.title}
      </Title>
      
      <Paragraph style={{ textAlign: 'center', marginBottom: 20 }}>
        <Text type="secondary">{poem.dynasty} · {poem.author}</Text>
      </Paragraph>
      
      <div className="chinese-divider" style={{ margin: '20px 0' }}></div>
      
      {renderPoemContent()}
      
      <div className="chinese-divider" style={{ margin: '20px 0' }}></div>
      
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Space>
          <Button 
            type="primary" 
            icon={isReading ? <PauseOutlined /> : <SoundOutlined />} 
            onClick={toggleReading}
            size="large"
            shape="round"
          >
            {isReading ? '暂停朗读' : '开始朗读'}
          </Button>
          
          <Button 
            icon={<ReloadOutlined />} 
            onClick={resetReading}
            size="large"
            shape="round"
          >
            重置
          </Button>
          
          <Tooltip title="朗读设置">
            <Button 
              icon={<SettingOutlined />} 
              onClick={() => setShowSettings(!showSettings)}
              size="large"
              shape="round"
              type={showSettings ? 'primary' : 'default'}
            />
          </Tooltip>
        </Space>
        
        {showSettings && (
          <div style={{ marginTop: 20, maxWidth: 300, margin: '0 auto' }}>
            <Text>朗读速度</Text>
            <Slider
              min={100}
              max={1000}
              step={50}
              value={readingSpeed}
              onChange={value => setReadingSpeed(value)}
              marks={{
                100: '快',
                500: '中',
                1000: '慢'
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default PoemReader; 