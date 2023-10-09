import React, { useRef } from 'react';
import Style from './side-bar.module.scss';
import { Card, Descriptions, Image, Popover, QRCode, Rate } from 'antd';
import { GithubFilled, WechatFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function LuckyBox({ num = 0, onNumChange }: { num: number; onNumChange: () => void }) {
  const [cube, setCube] = React.useState<string>('');

  React.useEffect(() => {
    getLuky();
  }, [num]);

  const getLuky = () => {
    switch (num) {
      case 1:
        setCube('');
        break;
      case 2:
        setCube('rotateY(90deg)');
        break;
      case 3:
        setCube('rotateY(-90deg)');
        break;
      case 4:
        setCube('rotateX(-90deg)');
        break;
      case 5:
        setCube('rotateX(90deg)');
        break;
      case 6:
        setCube('rotateY(180deg)');
        break;
    }
  };
  return (
    <div
      className={Style['lucky-box']}
      style={{ userSelect: 'none', transform: cube }}
      onClick={onNumChange}
    >
      <div className={Style['face']}>吉</div>
      <div className={Style['face']}>好</div>
      <div className={Style['face']}>衰</div>
      <div className={Style['face']}>顺</div>
      <div className={Style['face']}>利</div>
      <div className={Style['face']}>旺</div>
    </div>
  );
}

const SideBar: React.FC = () => {
  const [num, setNum] = React.useState<number>(1);
  const luckyBoxRef = useRef<HTMLDivElement>(null);

  const onNumChange = () => {
    let num = Math.floor(Math.random() * 6 + 1);
    setNum(num);
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onNumChange();
          luckyBoxRef.current && observer.unobserve(luckyBoxRef.current);
        }
      },
      {
        root: null,
        threshold: 1.0,
      },
    );

    if (luckyBoxRef.current) {
      observer.observe(luckyBoxRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <aside className={Style['side-bar']}>
      <Card
        className={Style['side-bar-card']}
        cover={
          <Image
            alt="mumu"
            src="https://cdn.irlin.cn/2c1e3db0-fef7-11ed-b7de-c1fb1f2a889f.webp-ImgAutoSmall"
          />
        }
        actions={[
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<QRCode value={'irlin.cn'} bordered={false} />}
          >
            <WechatFilled key={'wechat'} />
          </Popover>,
          ,
          <Link to={'https://github.com/1368590868'} target="__blank">
            <GithubFilled key="github" />
          </Link>,
        ]}
      >
        <Meta
          title="个人介绍"
          description="我是一个前端开发工程师，喜欢研究新技术，喜欢分享，喜欢开源，喜欢折腾，喜欢看书，喜欢旅游，喜欢美食，喜欢运动，喜欢音乐，喜欢电影，喜欢动漫，喜欢游戏，喜欢摄影，喜欢生活。"
        />
      </Card>
      <Card
        className={Style['side-bar-card']}
        title="点击测运势"
        style={{ marginTop: '3rem' }}
        ref={luckyBoxRef}
      >
        <Descriptions column={1} labelStyle={{ width: 60 }}>
          <Descriptions.Item label="运势">
            <Rate disabled value={num} count={6} />
          </Descriptions.Item>
          <Descriptions.Item label="">
            <LuckyBox num={num} onNumChange={onNumChange} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </aside>
  );
};

export default SideBar;
