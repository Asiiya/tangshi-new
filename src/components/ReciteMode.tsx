import { useState } from 'react';
import { Button, Modal, Typography, Space, Divider, Switch } from 'antd';
import { Poem } from '../data/poems';

const { Title, Paragraph, Text } = Typography;

interface ReciteModeProps {
  poem: Poem;
  visible: boolean;
  onClose: () => void;
}

const ReciteMode: React.FC<ReciteModeProps> = ({ poem, visible, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleReset = () => {
    setShowContent(false);
    setShowTranslation(false);
  };

  return (
    <Modal
      title="背诵模式"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="reset" onClick={handleReset}>
          重置
        </Button>,
        <Button key="close" type="primary" onClick={onClose}>
          关闭
        </Button>
      ]}
      width={700}
    >
      <Title level={3} style={{ textAlign: 'center' }}>{poem.title}</Title>
      <Paragraph style={{ textAlign: 'center' }}>
        <Text type="secondary">{poem.dynasty} · {poem.author}</Text>
      </Paragraph>

      <Divider />

      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>显示原文</Text>
          <Switch checked={showContent} onChange={setShowContent} />
        </div>

        <div style={{ 
          padding: '20px', 
          background: '#f9f9f9', 
          borderRadius: '8px',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {showContent ? (
            <Paragraph 
              style={{ 
                fontSize: 18, 
                lineHeight: 2, 
                textAlign: 'center',
                whiteSpace: 'pre-line',
                margin: 0
              }}
            >
              {poem.content}
            </Paragraph>
          ) : (
            <Text type="secondary">点击开关显示原文</Text>
          )}
        </div>

        {poem.translation && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <Text strong>显示译文</Text>
              <Switch checked={showTranslation} onChange={setShowTranslation} />
            </div>

            <div style={{ 
              padding: '20px', 
              background: '#f9f9f9', 
              borderRadius: '8px',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {showTranslation ? (
                <Paragraph style={{ margin: 0 }}>
                  {poem.translation}
                </Paragraph>
              ) : (
                <Text type="secondary">点击开关显示译文</Text>
              )}
            </div>
          </>
        )}
      </Space>

      <Divider />

      <Paragraph type="secondary" style={{ textAlign: 'center' }}>
        提示：使用开关控制显示内容，帮助您更好地背诵和理解诗歌。
      </Paragraph>
    </Modal>
  );
};

export default ReciteMode;