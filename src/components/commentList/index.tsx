import { Avatar, Button, Divider, List, Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { CommentList, CommentService } from '../../http/api';
import { useParams } from 'react-router-dom';
import useReplyModal from '../../hooks/useReplyModal';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

const CommentList: React.FC = () => {
  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [align, setAlign] = useState<PaginationAlign>('center');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSrouce] = useState<CommentList[]>([]);
  const [rows, setRows] = useState<CommentList>();

  const { showReply, ReplyForm, visible, closeReply } = useReplyModal();

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

  useEffect(() => {
    if (!visible) {
      console.log(closeReply);
      getCommentList();
    }
  }, [visible]);

  const onReply = (row: CommentList) => {
    setRows(row);
    showReply();
  };

  const ContentDescription = (row: CommentList) => (
    <>
      {row.content}
      <div style={{ fontSize: '1rem' }}>
        <Divider dashed={true}></Divider>
        {(window as any).dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    </>
  );

  const Description = (row: CommentList) => (
    <>
      {ContentDescription(row)}

      {/* reply */}
      {row.replys && row.replys.length > 0 && (
        <List
          size="small"
          bordered={true}
          pagination={false}
          dataSource={row.replys}
          style={{ whiteSpace: 'pre-line' }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`} />
                }
                title={
                  <a href={item.website} target="newWeb">
                    {item.userName}
                  </a>
                }
                description={ContentDescription(item)}
                key={item.id}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );

  return (
    <>
      <List
        size="large"
        pagination={false}
        dataSource={dataSource}
        style={{ whiteSpace: 'pre-line' }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => onReply(item)}>
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
              description={Description(item)}
              key={item.id}
            />
          </List.Item>
        )}
      />
      <ReplyForm rows={rows} />
    </>
  );
};

export default CommentList;
