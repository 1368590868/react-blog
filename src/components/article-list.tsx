import { Avatar, Card, List, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Style from './article-list.module.scss';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ArticleList, Axios } from '../http/api';

const ArticleList: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [dataSource, setDataSource] = useState<{ data: ArticleList[]; total: number }>({
    data: [],
    total: 0,
  });

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const tagList = [
    {
      key: '1',
      tab: '文章',
    },
    {
      key: '2',
      tab: '笔记',
    },
  ];

  React.useEffect(() => {
    getArticleList();
  }, []);

  const getArticleList = async (data = { page: 1, pageSize: 5 }) => {
    try {
      const res = await Axios.getArticleList(data);
      setDataSource(res);
    } catch (error) {
      message.error('获取文章列表失败');
    }
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <Card
      className={Style['article-list']}
      tabList={tagList}
      activeTabKey={activeTabKey}
      tabBarExtraContent={<a href="#">More</a>}
      onTabChange={onTabChange}
    >
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: async (page) => {
            await getArticleList({ page, pageSize: 5 });
          },
          total: dataSource.total,
          pageSize: 5,
        }}
        dataSource={dataSource.data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.avatar} />}
              title={<a href={item.title}>{item.title}</a>}
              // description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ArticleList;
