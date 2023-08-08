import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import CommentForm from '../commentForm';
import ReactDOM from 'react-dom';

interface Props {
  title?: string;
  isReply?: boolean;
}

const useReplyModal = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const showReply = () => {
    setVisible(true);
  };

  const closeReply = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const ReplyForm = useCallback(
    (props: Props) => {
      const { title = '回复列表', isReply = false } = props;
      return ReactDOM.createPortal(
        <Modal
          title={title}
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          destroyOnClose={true}
          footer={null}
        >
          <CommentForm isReply={isReply} />
        </Modal>,
        document.body,
      );
    },
    [visible],
  );

  return {
    ReplyForm,
    showReply,
  };
};

export default useReplyModal;
