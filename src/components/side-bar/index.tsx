import React from 'react';
import Style from './side-bar.module.scss';
import { Avatar, Card, Descriptions, Image, Popover, QRCode } from 'antd';
import { EditOutlined, EllipsisOutlined, QrcodeOutlined } from '@ant-design/icons';

const { Meta } = Card;

const SideBar: React.FC = () => {
  return (
    <aside className={Style['side-bar']}>
      <Card
        className={Style['side-bar-card']}
        cover={
          <Image
            alt="mumu"
            src="http://cdn.irlin.cn/2c1e3db0-fef7-11ed-b7de-c1fb1f2a889f.webp-ImgAutoSmall"
          />
        }
        actions={[
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<QRCode value={'irlin.cn'} bordered={false} />}
          >
            <QrcodeOutlined key="qrcode" />
          </Popover>,
          ,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title="Ape Blog"
          description="欢迎来到我的小站"
        />
      </Card>
      <Card className={Style['side-bar-card']} title="文章信息" style={{ marginTop: '3rem' }}>
        <Descriptions column={1} labelStyle={{ width: 60 }}>
          <Descriptions.Item label="分类">123132</Descriptions.Item>
          <Descriptions.Item label="标签">1233123</Descriptions.Item>
        </Descriptions>
      </Card>
    </aside>
  );
};

export default SideBar;
