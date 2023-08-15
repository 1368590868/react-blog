import { Image, Card, List, Space, message } from 'antd';
import React, { useState } from 'react';
import Style from './article-list.module.scss';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { ArticleList, ArticleParams, Axios, PAGENATION, TagsService } from '../../http/api';
import Link from 'antd/es/typography/Link';
import { CardTabListType } from 'antd/es/card';

const ArticleList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tagList, setTagsList] = useState<CardTabListType[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string>('all');
  const [dataSource, setDataSource] = useState<{ data: ArticleList[]; total: number }>({
    data: [],
    total: 0,
  });

  const onTabChange = (key: string) => {
    console.log(key);
    setActiveTabKey(key);
    getArticleList({
      ...PAGENATION,
      tags: key === 'all' ? [] : [key],
    });
  };

  const getTagsList = async () => {
    setLoading(true);
    try {
      const res = await TagsService.getTagsList();
      if (res.code === 200) {
        const tagTabs: CardTabListType[] = res.data.map((item) => ({
          key: item.id ?? '',
          tab: item.name ?? '',
        }));
        tagTabs.splice(0, 0, {
          key: 'all',
          tab: '全部',
        });
        setTagsList(tagTabs);
        setActiveTabKey(tagTabs[0].key);
      }
    } catch (error) {
      message.error('获取标签列表失败');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getArticleList();
    getTagsList();
  }, []);

  const getArticleList = async (data: ArticleParams = { page: 1, pageSize: 5, tags: [] }) => {
    setLoading(true);
    try {
      const res = await Axios.getArticleList(data);
      if (res.code === 200) {
        setDataSource(res.data);
      }
    } catch (error) {
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
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
      tabBarExtraContent={<></>}
      onTabChange={onTabChange}
    >
      <List
        loading={loading}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: async (page) => {
            await getArticleList({
              ...PAGENATION,
              page,
              tags: activeTabKey === 'all' ? [] : [activeTabKey],
            });
          },
          total: dataSource.total,
          ...PAGENATION,
        }}
        dataSource={dataSource.data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <Link>
                <IconText icon={LikeOutlined} text={item.read_count} key="list-vertical-like-o" />
              </Link>,
              <Link href={`/article/${item.id}`}>
                <IconText icon={MessageOutlined} text={item.comments} key="list-vertical-message" />
              </Link>,
            ]}
            extra={
              item.cover_image && (
                <Image
                  src={item.cover_image}
                  alt={item.cover_image}
                  style={{ maxHeight: 200, minWidth: 80 }}
                />
              )
            }
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.avatar} />}
              title={<Link href={`/article/${item.id}`}>{item.title}</Link>}
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
