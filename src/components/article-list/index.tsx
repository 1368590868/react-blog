import { Image, Card, List, Space, message, Typography, Tag, Skeleton, Divider } from 'antd';
import React, { useState } from 'react';
import Style from './article-list.module.scss';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { ArticleList, ArticleParams, Axios, PAGENATION, TagsService } from '../../http/api';
import Link from 'antd/es/typography/Link';
import { CardTabListType } from 'antd/es/card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { uniqBy } from 'lodash';

const ArticleList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tagList, setTagsList] = useState<CardTabListType[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string>('all');
  const [isMore, setIsMore] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<string[]>([]);
  const [list, setList] = useState<ArticleList[]>([]);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
    setList([]);
    setPage(1);
    setTags(key === 'all' ? [] : [key]);
    setIsMore(true);
    getArticleList({ ...PAGENATION, tags: key === 'all' ? [] : [key] });
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

    return () => {
      setList([]);
      setPage(1);
    };
  }, []);

  // 获取视窗宽度，改变list itemLayout
  const [itemLayout, setItemLayout] = useState<'vertical' | 'horizontal'>('vertical');
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setItemLayout('vertical');
      } else {
        setItemLayout('horizontal');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getArticleList = async (data: ArticleParams = { page, pageSize: 5, tags }) => {
    setLoading(true);
    try {
      const res = await Axios.getArticleList(data);
      if (res.code === 200) {
        setList((prevList) => {
          if (prevList.length >= res.data.total) {
            setIsMore(false);
          } else {
            setPage(page + 1);
          }
          return uniqBy([...prevList, ...res.data.data], 'id');
        });

        setIsMore(res.data.data.length !== 0);
      }
    } catch (error) {
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  /** 滚动的加载更多 */
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    getArticleList();
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
      <InfiniteScroll
        dataLength={list.length}
        next={loadMoreData}
        hasMore={list.length % 5 === 0 && isMore}
        loader={
          <Card>
            {[...Array(5)].map((_, index) => (
              <Skeleton active key={index} />
            ))}
          </Card>
        }
        endMessage={<Divider plain>人生若只如初见，何事秋风悲画扇~ 🥱</Divider>}
      >
        <List
          loading={loading}
          itemLayout={'vertical'}
          size="large"
          // pagination={{
          //   onChange: async (page) => {
          //     await getArticleList({
          //       ...PAGENATION,
          //       page,
          //       tags: activeTabKey === 'all' ? [] : [activeTabKey],
          //     });
          //   },
          //   total: dataSource.total,
          //   ...PAGENATION,
          // }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              style={{ paddingBottom: 50 }}
              actions={[
                <Link>
                  <IconText icon={LikeOutlined} text={item.read_count} key="list-vertical-like-o" />
                </Link>,
                <Link href={`/article/${item.id}`}>
                  <IconText
                    icon={MessageOutlined}
                    text={item.comments}
                    key="list-vertical-message"
                  />
                </Link>,
              ]}
              extra={
                itemLayout === 'horizontal' &&
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
                title={
                  <Link href={`/article/${item.id}`} style={{ fontSize: 16 }}>
                    {item.title}
                  </Link>
                }
                description={
                  <div className={Style['article-bottom']}>
                    <span>
                      更新日期：{' '}
                      {(window as any).dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                    <span>阅读数： {item.read_count}</span>
                  </div>
                }
              />

              <Space size={[8, 16]} wrap className={Style['article-tag']}>
                {item.tags.map((tag) => (
                  <Tag color={tag.color} key={tag.id}>
                    {tag.name}
                  </Tag>
                ))}
              </Space>

              <Link href={`/article/${item.id}`}>
                <Typography.Paragraph className="post-title">{item.content}</Typography.Paragraph>
              </Link>

              {itemLayout === 'vertical' && item.cover_image && (
                <Image
                  src={item.cover_image}
                  alt={item.cover_image}
                  style={{ maxHeight: 200, minWidth: 80 }}
                />
              )}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Card>
  );
};

export default ArticleList;
