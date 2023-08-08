import { Avatar, Button, List, Radio, Space } from 'antd';
import React, { useState } from 'react';
import { CommentList, CommentService } from '../../http/api';
import { useParams } from 'react-router-dom';
import useReplyModal from '../useReplyModal';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const CommentList: React.FC = () => {
  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [align, setAlign] = useState<PaginationAlign>('center');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSrouce] = useState<CommentList[]>([]);
  const { showReply, ReplyForm } = useReplyModal({ title: '回复列表' });

  const { id } = useParams<{ id: string }>();

  const getCommentList = async () => {
    setLoading(true);
    try {
      if (!id) {
        throw new Error('id is required');
      }
      const res = await CommentService.getCommentList(id);
      if (res.code === 200) {
        setDataSrouce(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getCommentList();
  }, []);

  const onReply = () => {
    showReply();
  };

  return (
    <>
      <Space direction="vertical" style={{ marginBottom: '20px' }} size="middle"></Space>
      <List
        pagination={false}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={onReply}>
                回复
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`} />}
              title={
                <a href={item.website} target="newWeb">
                  {item.userName}
                </a>
              }
              description={item.content}
              key={item.id}
            />
          </List.Item>
        )}
      />
      <ReplyForm />
    </>
  );
};

export default CommentList;
