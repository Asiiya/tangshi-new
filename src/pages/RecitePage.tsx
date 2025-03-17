import { useState } from 'react';
import { Typography, Card, Select } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { poems, Poem } from '../data/poems';
import PoemReader from '../components/PoemReader';

const { Title, Text } = Typography;
const { Option } = Select;

const RecitePage = () => {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  
  // 选择诗词
  const handlePoemChange = (poemId: string) => {
    const poem = poems.find(p => p.id === poemId) || null;
    setSelectedPoem(poem);
  };

  return (
    <div>
      <Title level={2} className="brush-title" style={{ textAlign: 'center', marginBottom: 30 }}>
        <BookOutlined style={{ marginRight: 10 }} />
        诗词朗读
      </Title>
      
      <div className="chinese-divider"></div>
      
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Card className="paper-bg" style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <Text strong>选择诗词：</Text>
            <Select 
              style={{ width: 300, marginLeft: 10 }} 
              placeholder="请选择一首诗词"
              onChange={handlePoemChange}
            >
              {poems.map(poem => (
                <Option key={poem.id} value={poem.id}>
                  {poem.title} - {poem.author}
                </Option>
              ))}
            </Select>
          </div>
        </Card>
        
        {selectedPoem && (
          <PoemReader poem={selectedPoem} />
        )}
      </div>
    </div>
  );
};

export default RecitePage; 