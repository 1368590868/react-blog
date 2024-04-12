import React from 'react';
import { Button, Flex, Form, Input, Select, message } from 'antd';
import { CommentList, CommentService } from '../../http/api';
import { useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const validateMessages = {
  required: '${label}是必填哟!',
  types: {
    email: '${label}填写错误!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
};

interface Props {
  isCommentId?: string;
  closeReply?: () => void;
}

const CommentForm: React.FC<Props> = (props) => {
  const [before, setBefore] = React.useState('http://');
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(false);

  const [form] = useForm();
  const { isCommentId = '', closeReply } = props;

  const handleChangeBefore = (value: string) => {
    setBefore(value);
  };

  const onFinish = async (values: CommentList) => {
    setLoading(true);
    try {
      if (values.website) {
        values.website = before + values.website;
      }
      if (!id) {
        throw new Error('id is required');
      }
      const res = await CommentService[!!isCommentId ? 'addReply' : 'addComment'](
        values,
        !isCommentId ? id : isCommentId
      );
      if (res.code === 200) {
        const { content, ...infoList } = values;
        localStorage.setItem('userInfo', JSON.stringify(infoList));
        message.success('评论成功');
        form.resetFields(['content']);

        closeReply && closeReply();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const userInfo: any = localStorage.getItem('userInfo');
    if (userInfo) {
      const parseUserInfo = JSON.parse(userInfo);
      if (parseUserInfo?.website) {
        parseUserInfo.website = parseUserInfo.website
          .replace('http://', '')
          .replace('https://', '');
      }
      form.setFieldsValue(parseUserInfo);
    }
  }, []);

  const selectBefore = (
    <Select defaultValue="http://" onChange={handleChangeBefore}>
      <Select.Option value="http://">http://</Select.Option>
      <Select.Option value="https://">https://</Select.Option>
    </Select>
  );
  return (
    <Form
      form={form}
      {...layout}
      wrapperCol={{ flex: 'auto' }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name={'userName'} label="姓名" rules={[{ required: true }]}>
        <Input placeholder="姓名" />
      </Form.Item>
      <Form.Item
        name={'email'}
        tooltip={'填写邮箱后评论自动通知'}
        label="邮箱"
        rules={[{ type: 'email' }, { required: true }]}
      >
        <Input placeholder="不会公开您的邮箱" />
      </Form.Item>
      <Form.Item name={'website'} tooltip="自动加入友链哟！" label="个人网页">
        <Input addonBefore={selectBefore} placeholder="填写后自动加入友链哟~" />
      </Form.Item>
      <Form.Item name={'content'} label="评论内容" rules={[{ required: true }]}>
        <Input.TextArea
          autoSize={{ minRows: 5, maxRows: 7 }}
          maxLength={150}
          showCount
          placeholder="请输入友善评论~"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol }} label=" " colon={false}>
        <Flex align="center" justify="center">
          <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
            发表看法
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
