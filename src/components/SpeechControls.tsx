import React, { useState, useEffect } from 'react';
import { Button, Slider, Tooltip, Space, Select, message } from 'antd';
import { 
  SoundOutlined, 
  PauseOutlined, 
  PlayCircleOutlined, 
  StopOutlined,
  AudioOutlined
} from '@ant-design/icons';
import SpeechService, { SpeechStatus, SpeechOptions } from '../utils/speechUtils';

const { Option } = Select;

interface SpeechControlsProps {
  text: string;
  autoScroll?: boolean;
  highlightCurrentSentence?: boolean;
  containerRef?: React.RefObject<HTMLElement>;
}

const SpeechControls: React.FC<SpeechControlsProps> = ({ 
  text, 
  autoScroll = false,
  highlightCurrentSentence = false,
  containerRef
}) => {
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  // 初始化语音合成服务
  useEffect(() => {
    const supported = SpeechService.isSupported();
    setIsSupported(supported);

    if (!supported) {
      message.warning('您的浏览器不支持语音合成功能');
      return;
    }

    const speechService = SpeechService.getInstance();
    
    // 获取可用的声音
    const loadVoices = () => {
      const allVoices = speechService.getVoices();
      setVoices(allVoices);
      
      // 尝试选择一个中文声音
      const chineseVoices = speechService.getChineseVoices();
      if (chineseVoices.length > 0) {
        setSelectedVoice(chineseVoices[0]);
      } else if (allVoices.length > 0) {
        setSelectedVoice(allVoices[0]);
      }
    };

    // 加载可用声音
    loadVoices();
    
    // 注册状态变化回调
    const handleStatusChange = (newStatus: SpeechStatus) => {
      setStatus(newStatus);
    };
    
    speechService.onStatusChange(handleStatusChange);
    
    // 组件卸载时清理
    return () => {
      speechService.removeStatusChangeCallback(handleStatusChange);
      speechService.stop();
    };
  }, []);

  // 开始朗读
  const handleSpeak = () => {
    if (!isSupported) return;
    
    const speechService = SpeechService.getInstance();
    const options: SpeechOptions = {
      rate,
      pitch,
      volume,
      voice: selectedVoice || undefined
    };
    
    speechService.speak(text, options);
  };

  // 暂停朗读
  const handlePause = () => {
    if (!isSupported) return;
    
    const speechService = SpeechService.getInstance();
    speechService.pause();
  };

  // 恢复朗读
  const handleResume = () => {
    if (!isSupported) return;
    
    const speechService = SpeechService.getInstance();
    speechService.resume();
  };

  // 停止朗读
  const handleStop = () => {
    if (!isSupported) return;
    
    const speechService = SpeechService.getInstance();
    speechService.stop();
  };

  // 处理声音选择变化
  const handleVoiceChange = (voiceName: string) => {
    const selectedVoice = voices.find(voice => voice.name === voiceName) || null;
    setSelectedVoice(selectedVoice);
  };

  // 根据语音状态渲染不同的控制按钮
  const renderControlButton = () => {
    if (status === 'playing') {
      return (
        <Button 
          icon={<PauseOutlined />} 
          onClick={handlePause}
          type="primary"
        >
          暂停
        </Button>
      );
    } else if (status === 'paused') {
      return (
        <Button 
          icon={<PlayCircleOutlined />} 
          onClick={handleResume}
          type="primary"
        >
          继续
        </Button>
      );
    } else {
      return (
        <Button 
          icon={<SoundOutlined />} 
          onClick={handleSpeak}
          type="primary"
        >
          朗读
        </Button>
      );
    }
  };

  if (!isSupported) {
    return (
      <div style={{ marginBottom: 16 }}>
        <Tooltip title="您的浏览器不支持语音合成功能">
          <Button icon={<AudioOutlined />} disabled>
            朗读功能不可用
          </Button>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="speech-controls" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <Space>
          {renderControlButton()}
          
          {status !== 'idle' && (
            <Button 
              icon={<StopOutlined />} 
              onClick={handleStop}
              danger
            >
              停止
            </Button>
          )}
        </Space>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ width: 80 }}>选择声音:</div>
          <Select
            style={{ width: 240 }}
            value={selectedVoice?.name}
            onChange={handleVoiceChange}
            placeholder="选择声音"
          >
            {voices.map(voice => (
              <Option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </Option>
            ))}
          </Select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ width: 80 }}>语速:</div>
          <Slider
            min={0.5}
            max={2}
            step={0.1}
            value={rate}
            onChange={setRate}
            style={{ width: 240 }}
          />
          <div style={{ marginLeft: 16 }}>{rate.toFixed(1)}x</div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ width: 80 }}>音调:</div>
          <Slider
            min={0.5}
            max={1.5}
            step={0.1}
            value={pitch}
            onChange={setPitch}
            style={{ width: 240 }}
          />
          <div style={{ marginLeft: 16 }}>{pitch.toFixed(1)}</div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 80 }}>音量:</div>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={setVolume}
            style={{ width: 240 }}
          />
          <div style={{ marginLeft: 16 }}>{Math.round(volume * 100)}%</div>
        </div>
      </div>
    </div>
  );
};

export default SpeechControls; 