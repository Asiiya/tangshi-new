import React, { useState, useEffect } from 'react';
import { Typography, Card, Switch, Radio, Slider, Divider, Space, Select, Button, message } from 'antd';
import { SettingOutlined, SoundOutlined, BgColorsOutlined, FontSizeOutlined } from '@ant-design/icons';
import SpeechService, { SpeechOptions } from '../utils/speechUtils';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const SettingsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [selectedTheme, setSelectedTheme] = useState('default');
  
  // 语音设置
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);

  // 主题列表
  const themes = [
    { key: 'default', name: '默认主题' },
    { key: 'jade', name: '青瓷主题' },
    { key: 'bamboo', name: '竹林主题' },
    { key: 'ink', name: '墨韵主题' },
    { key: 'autumn', name: '金秋主题' }
  ];

  useEffect(() => {
    // 从localStorage读取设置
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || '16', 10);
    
    setIsDarkMode(darkMode);
    setSelectedTheme(savedTheme);
    setFontSize(savedFontSize);
    
    // 加载语音设置
    const supported = SpeechService.isSupported();
    setIsVoiceSupported(supported);
    
    if (supported) {
      const speechService = SpeechService.getInstance();
      const allVoices = speechService.getVoices();
      setVoices(allVoices);
      
      // 尝试选择中文声音
      const chineseVoices = speechService.getChineseVoices();
      if (chineseVoices.length > 0) {
        setSelectedVoice(chineseVoices[0]);
      } else if (allVoices.length > 0) {
        setSelectedVoice(allVoices[0]);
      }
      
      // 加载保存的语音设置
      const savedRate = parseFloat(localStorage.getItem('speechRate') || '1');
      const savedPitch = parseFloat(localStorage.getItem('speechPitch') || '1');
      const savedVolume = parseFloat(localStorage.getItem('speechVolume') || '1');
      
      setRate(savedRate);
      setPitch(savedPitch);
      setVolume(savedVolume);
    }
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    document.body.classList.toggle('dark-mode', checked);
    localStorage.setItem('darkMode', checked.toString());
  };

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    
    // 移除所有主题类
    document.body.classList.remove(...themes.map(t => `theme-${t.key}`).filter(Boolean));
    
    // 添加新主题类
    if (value !== 'default') {
      document.body.classList.add(`theme-${value}`);
    }
    
    localStorage.setItem('theme', value);
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    document.documentElement.style.setProperty('--base-font-size', `${newSize}px`);
    localStorage.setItem('fontSize', newSize.toString());
  };

  // 处理声音选择变化
  const handleVoiceChange = (voiceName: string) => {
    const selected = voices.find(voice => voice.name === voiceName) || null;
    setSelectedVoice(selected);
  };

  // 保存语音设置
  const saveSpeechSettings = () => {
    localStorage.setItem('speechRate', rate.toString());
    localStorage.setItem('speechPitch', pitch.toString());
    localStorage.setItem('speechVolume', volume.toString());
    
    if (selectedVoice) {
      localStorage.setItem('speechVoice', selectedVoice.name);
    }
    
    message.success('语音设置已保存');
  };

  // 测试语音设置
  const testSpeech = () => {
    if (!isVoiceSupported) return;
    
    const speechService = SpeechService.getInstance();
    const options: SpeechOptions = {
      rate,
      pitch,
      volume,
      voice: selectedVoice || undefined
    };
    
    speechService.speak('这是一个测试，检查您的语音设置是否符合预期。', options);
  };

  return (
    <div className="container" style={{ padding: '20px 0' }}>
      <div className="page-header">
        <Title level={2} className="brush-title">设置</Title>
        <Divider className="custom-divider" />
      </div>
      
      <Card 
        className="settings-card"
        style={{ 
          maxWidth: 800, 
          margin: '0 auto',
          boxShadow: 'var(--card-shadow)',
          borderRadius: 8,
          border: '1px solid var(--border-color)'
        }}
      >
        <Title level={4}>
          <SettingOutlined style={{ marginRight: 8 }} />
          界面设置
        </Title>
        
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>夜间模式</div>
          <Switch 
            checked={isDarkMode} 
            onChange={toggleDarkMode}
          />
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>主题颜色</div>
          <Radio.Group 
            value={selectedTheme}
            onChange={e => handleThemeChange(e.target.value)}
          >
            {themes.map(theme => (
              <Radio.Button key={theme.key} value={theme.key}>
                {theme.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        
        <div>
          <div style={{ marginBottom: 8 }}>
            <FontSizeOutlined style={{ marginRight: 8 }} />
            字体大小
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Slider
              min={12}
              max={24}
              step={1}
              value={fontSize}
              onChange={handleFontSizeChange}
              style={{ width: 300, marginRight: 16 }}
            />
            <div>{fontSize}px</div>
          </div>
        </div>
      </Card>
      
      {isVoiceSupported && (
        <Card>
          <Title level={4}>
            <SoundOutlined style={{ marginRight: 8 }} />
            朗读设置
          </Title>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>默认语音</div>
            <Select
              style={{ width: 300 }}
              value={selectedVoice?.name}
              onChange={handleVoiceChange}
              placeholder="选择语音"
            >
              {voices.map(voice => (
                <Option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </Option>
              ))}
            </Select>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>语速</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={rate}
                onChange={setRate}
                style={{ width: 300, marginRight: 16 }}
              />
              <div>{rate.toFixed(1)}x</div>
            </div>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>音调</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Slider
                min={0.5}
                max={1.5}
                step={0.1}
                value={pitch}
                onChange={setPitch}
                style={{ width: 300, marginRight: 16 }}
              />
              <div>{pitch.toFixed(1)}</div>
            </div>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>音量</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={setVolume}
                style={{ width: 300, marginRight: 16 }}
              />
              <div>{Math.round(volume * 100)}%</div>
            </div>
          </div>
          
          <Space>
            <Button type="primary" onClick={saveSpeechSettings}>
              保存语音设置
            </Button>
            <Button onClick={testSpeech}>
              测试语音
            </Button>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage; 