import React, { useState } from 'react';
import { Typography, Card, List, Tag, Button, Input, Divider, Space, Collapse, Modal } from 'antd';
import { ReadOutlined, BookOutlined, TagOutlined, TeamOutlined, SearchOutlined, SoundOutlined } from '@ant-design/icons';
import { stories, Story } from '../data/stories';
import SpeechControls from '../components/SpeechControls';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

const StoriesPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 获取所有标签
  const allTags = Array.from(
    new Set(stories.flatMap(story => story.tags))
  );

  // 获取所有年龄组
  const ageGroups = Array.from(
    new Set(stories.map(story => story.ageGroup))
  );

  // 根据筛选条件过滤故事
  const filteredStories = stories.filter(story => {
    const matchesSearch = searchText === '' || 
      story.title.toLowerCase().includes(searchText.toLowerCase()) ||
      story.content.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => story.tags.includes(tag));

    const matchesAgeGroup = selectedAgeGroup === null || 
      story.ageGroup === selectedAgeGroup;

    return matchesSearch && matchesTags && matchesAgeGroup;
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleAgeGroup = (ageGroup: string) => {
    if (selectedAgeGroup === ageGroup) {
      setSelectedAgeGroup(null);
    } else {
      setSelectedAgeGroup(ageGroup);
    }
  };

  const resetFilters = () => {
    setSearchText('');
    setSelectedTags([]);
    setSelectedAgeGroup(null);
  };

  const showStoryDetail = (story: Story) => {
    setCurrentStory(story);
    setModalVisible(true);
  };

  // 格式化故事文本用于朗读
  const getFormattedTextForSpeech = (story: Story) => {
    if (!story) return '';
    
    let result = `${story.title}，适合${story.ageGroup}的儿童。`;
    
    // 添加正文
    result += story.content;
    
    return result;
  };

  return (
    <div>
      <Title level={2} className="brush-title" style={{ marginBottom: 24, textAlign: 'center' }}>
        <BookOutlined style={{ marginRight: 12 }} />
        儿童睡前故事
      </Title>
      <Paragraph style={{ textAlign: 'center', fontSize: 16, marginBottom: 32 }}>
        精选适合孩子的睡前故事，培养孩子的想象力和道德观念
      </Paragraph>

      <div style={{ marginBottom: 24 }}>
        <Search
          placeholder="搜索故事..."
          allowClear
          enterButton
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: 500, margin: '0 auto', display: 'block' }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 24 }}>
        <Card style={{ width: '100%', marginBottom: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <Title level={5} style={{ marginBottom: 8 }}>
              <TeamOutlined /> 适合年龄
            </Title>
            <Space wrap>
              {ageGroups.map(ageGroup => (
                <Button 
                  key={ageGroup}
                  type={selectedAgeGroup === ageGroup ? 'primary' : 'default'}
                  onClick={() => toggleAgeGroup(ageGroup)}
                  size="small"
                >
                  {ageGroup}
                </Button>
              ))}
            </Space>
          </div>

          <div>
            <Title level={5} style={{ marginBottom: 8 }}>
              <TagOutlined /> 故事标签
            </Title>
            <Space wrap>
              {allTags.map(tag => (
                <Tag 
                  key={tag}
                  color={selectedTags.includes(tag) ? 'blue' : 'default'}
                  style={{ cursor: 'pointer', margin: '4px' }}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        </Card>
      </div>

      {(selectedTags.length > 0 || selectedAgeGroup || searchText) && (
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button type="link" onClick={resetFilters}>
            重置筛选
          </Button>
        </div>
      )}

      <List
        grid={{ 
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4
        }}
        dataSource={filteredStories}
        renderItem={story => (
          <List.Item>
            <Card 
              hoverable
              onClick={() => showStoryDetail(story)}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ReadOutlined style={{ marginRight: 8, color: 'var(--primary-color)' }} />
                  {story.title}
                </div>
              }
              extra={<Tag color="blue">{story.ageGroup}</Tag>}
            >
              <div style={{ minHeight: 80 }}>
                <Paragraph ellipsis={{ rows: 3 }}>
                  {story.content.substring(0, 100)}...
                </Paragraph>
              </div>
              <div style={{ marginTop: 12 }}>
                {story.tags.map(tag => (
                  <Tag key={tag} style={{ margin: '2px' }}>{tag}</Tag>
                ))}
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={currentStory?.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        {currentStory && (
          <div>
            <div className="story-content" style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
              {currentStory.content}
            </div>
            
            <Divider />
            
            <Collapse>
              <Panel 
                header={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SoundOutlined style={{ marginRight: 8 }} />
                    朗读故事
                  </div>
                } 
                key="1"
              >
                <SpeechControls text={getFormattedTextForSpeech(currentStory)} />
              </Panel>
            </Collapse>
            
            <Divider />
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '16px' }}>适合年龄：</Text> {currentStory.ageGroup}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '16px' }}>故事寓意：</Text> {currentStory.moral}
            </div>
            <div>
              <Text strong style={{ fontSize: '16px' }}>标签：</Text> 
              <div style={{ marginTop: '8px' }}>
                {currentStory.tags.map(tag => (
                  <Tag key={tag} color="blue" style={{ margin: '4px' }}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StoriesPage; 