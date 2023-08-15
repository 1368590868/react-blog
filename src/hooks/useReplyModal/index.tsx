import React, { useCallback } from 'react';
import { Modal } from 'antd';
import CommentForm from '../../components/commentForm';
import ReactDOM from 'react-dom';
import { CommentList } from '../../http/api';

interface Props {
  title?: string;
  rows?: CommentList;
}

const useReplyModal = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const showReply = () => {
    setVisible(true);
  };

  const closeReply = () => {
    setVisible(false);
  };

  const ReplyForm = useCallback(
    (props: Props) => {
      const { rows } = props;

      const handleOk = () => {
        setVisible(false);
      };

      const handleCancel = () => {
        setVisible(false);
      };
      return ReactDOM.createPortal(
        <Modal
          title={`回复@${rows?.userName}`}
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          destroyOnClose={true}
          footer={null}
        >
          <CommentForm isCommentId={rows?.id} closeReply={closeReply} />
        </Modal>,
        document.body,
      );
    },
    [visible],
  );

  return {
    ReplyForm,
    showReply,
    closeReply,
    visible,
  };
};

export default useReplyModal;
