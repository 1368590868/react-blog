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
        threshold: 1.0
      }
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
          </Link>
        ]}
      >
        <Meta
          title="个人介绍"
          description="好记性当然不如烂笔头，这里是我的个人空间，记录一些学习笔记，生活感悟。"
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

      <Card
        className={Style['side-bar-card']}
        title=""
        style={{ marginTop: '3rem' }}
        ref={luckyBoxRef}
      >
        <Descriptions column={1} labelStyle={{ width: 100 }}>
          <Descriptions.Item label="备案号">
            <a href="https://beian.miit.gov.cn" target="_blank">
              渝ICP备2023013929号
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="渝公网备">
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50024102500401"
              style={{
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              50024102500401号
            </a>
          </Descriptions.Item>
          <Descriptions.Item>
            <span style={{ fontSize: 12 }}>
              CopyRight © 2023 - 2520 - 木木 - ALL RIGHTS RESERVED
            </span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </aside>
  );
};

export default SideBar;
