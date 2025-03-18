/**
 * 语音合成工具类，提供文本朗读功能
 */

// 语音设置类型
export interface SpeechOptions {
  rate?: number;       // 语速 (0.1 到 10)
  pitch?: number;      // 音调 (0 到 2)
  volume?: number;     // 音量 (0 到 1)
  lang?: string;       // 语言 ('zh-CN', 'en-US', 等)
  voice?: SpeechSynthesisVoice; // 语音
}

// 默认语音设置
const defaultOptions: SpeechOptions = {
  rate: 1,
  pitch: 1,
  volume: 1,
  lang: 'zh-CN'
};

// 朗读状态类型
export type SpeechStatus = 'idle' | 'playing' | 'paused' | 'stopped';

// 朗读状态回调函数类型
export type SpeechStatusCallback = (status: SpeechStatus) => void;

class SpeechService {
  private static instance: SpeechService;
  private synthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private status: SpeechStatus = 'idle';
  private statusCallbacks: SpeechStatusCallback[] = [];
  private voices: SpeechSynthesisVoice[] = [];
  private isVoicesLoaded = false;

  private constructor() {
    this.synthesis = window.speechSynthesis;
    this.loadVoices();
    
    // 处理语音列表加载
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  /**
   * 加载可用的语音列表
   */
  private loadVoices(): void {
    this.voices = this.synthesis.getVoices();
    this.isVoicesLoaded = true;
  }

  /**
   * 获取可用的语音列表
   */
  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.isVoicesLoaded) {
      this.loadVoices();
    }
    return this.voices;
  }

  /**
   * 获取中文语音
   */
  public getChineseVoices(): SpeechSynthesisVoice[] {
    return this.getVoices().filter(voice => 
      voice.lang.includes('zh') || 
      voice.lang.includes('cmn') || 
      voice.name.includes('Chinese')
    );
  }

  /**
   * 朗读文本
   * @param text 要朗读的文本
   * @param options 语音设置
   */
  public speak(text: string, options: SpeechOptions = {}): void {
    // 如果正在朗读，先停止
    this.stop();

    // 合并选项
    const mergedOptions = { ...defaultOptions, ...options };
    
    // 创建语音合成实例
    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = mergedOptions.rate!;
    this.utterance.pitch = mergedOptions.pitch!;
    this.utterance.volume = mergedOptions.volume!;
    this.utterance.lang = mergedOptions.lang!;
    
    // 如果指定了声音，使用指定的声音
    if (mergedOptions.voice) {
      this.utterance.voice = mergedOptions.voice;
    } else {
      // 尝试使用中文声音
      const chineseVoices = this.getChineseVoices();
      if (chineseVoices.length > 0) {
        this.utterance.voice = chineseVoices[0];
      }
    }

    // 设置事件监听器
    this.utterance.onstart = () => this.updateStatus('playing');
    this.utterance.onend = () => this.updateStatus('idle');
    this.utterance.onpause = () => this.updateStatus('paused');
    this.utterance.onresume = () => this.updateStatus('playing');
    this.utterance.onerror = () => this.updateStatus('stopped');

    // 开始朗读
    this.synthesis.speak(this.utterance);
    this.updateStatus('playing');
  }

  /**
   * 暂停朗读
   */
  public pause(): void {
    if (this.status === 'playing') {
      this.synthesis.pause();
      this.updateStatus('paused');
    }
  }

  /**
   * 恢复朗读
   */
  public resume(): void {
    if (this.status === 'paused') {
      this.synthesis.resume();
      this.updateStatus('playing');
    }
  }

  /**
   * 停止朗读
   */
  public stop(): void {
    this.synthesis.cancel();
    this.updateStatus('stopped');
  }

  /**
   * 获取当前朗读状态
   */
  public getStatus(): SpeechStatus {
    return this.status;
  }

  /**
   * 更新朗读状态并触发回调
   */
  private updateStatus(status: SpeechStatus): void {
    this.status = status;
    this.notifyStatusChange();
  }

  /**
   * 注册状态变化回调
   * @param callback 状态变化回调函数
   */
  public onStatusChange(callback: SpeechStatusCallback): void {
    this.statusCallbacks.push(callback);
  }

  /**
   * 移除状态变化回调
   * @param callback 要移除的回调函数
   */
  public removeStatusChangeCallback(callback: SpeechStatusCallback): void {
    this.statusCallbacks = this.statusCallbacks.filter(cb => cb !== callback);
  }

  /**
   * 通知所有注册的回调函数
   */
  private notifyStatusChange(): void {
    this.statusCallbacks.forEach(callback => callback(this.status));
  }

  /**
   * 检查浏览器是否支持语音合成
   */
  public static isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

export default SpeechService; 