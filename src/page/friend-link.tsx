import { FunctionComponent } from 'react';
import Styles from './friend-link.module.scss';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';

const gridStyle: React.CSSProperties = {
  width: '25%'
};

const linkConfig = [
  {
    _id: 'cd045e756126004107ab75ec400fd0eb',
    _openid: '9bf44da2dbb8473da1fcf4f591cb82ff',
    avatar: 'https://img.lzxjack.top:99/202203311718524.webp',
    date: 1680709382000,
    descr: '一个不善言辞的Java攻城狮',
    link: 'https://leidl.top',
    name: '柠檬大师的空间站'
  },
  {
    _id: 'cd045e75613345140ab9f3a8667b7026',
    _openid: '9bf44da2dbb8473da1fcf4f591cb82ff',
    avatar: 'https://img.lzxjack.top:99/202203311718521.webp',
    date: 1680709389000,
    descr: '以梦为马，不负韶华。',
    link: 'https://wr0926.ml',
    name: '时过境迁Wayne博客'
  },
  {
    _id: '0ab5303b62cee3980e527f9309406342',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://img.lzxjack.top:99/202208072334375.webp',
    date: 1680709401000,
    descr: '唯有热爱，可抵岁月漫长',
    link: 'https://www.liuzepeng.com',
    name: 'lzp的个人网站'
  },
  {
    _id: '14139e12615afe881114dda67725ca8f',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://img.lzxjack.top:99/202203311718515.webp',
    date: 1680709407000,
    descr: '星河滚烫，无问西东。',
    link: 'http://blog.meta-code.top/',
    name: '百里飞洋の博客'
  },
  {
    _id: '287a53aa61b6219301bea8b4158fd473',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://img.lzxjack.top:99/202203311718516.webp',
    date: 1680709416000,
    descr: '詹蜜 字节前端工程师。公众号“前端LeBron”!',
    link: 'https://www.lebronchao.com/',
    name: '前端LeBron'
  },
  {
    _id: '2d44d6c2612720b107100241040410e8',
    _openid: '9bf44da2dbb8473da1fcf4f591cb82ff',
    avatar: 'https://img.lzxjack.top:99/202203311718528.webp',
    date: 1680709424000,
    descr: '醒亦念卿，梦亦念卿',
    link: 'https://blog.justlovesmile.top',
    name: "MJ's Blog"
  },
  {
    _id: '60215482631b3428001419dd438edd08',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://img.lzxjack.top:99/202209282311282.webp',
    date: 1680709433000,
    descr: '我仍相信人间滚烫',
    link: 'https://blog.btwoa.com',
    name: 'btwoa'
  },
  {
    _id: '8937eaa9614156f50b3adc2b01fe2d85',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://img.lzxjack.top:99/202203311718530.webp',
    date: 1680709442000,
    descr: 'legroft的划水日常',
    link: 'https://jinjis.cn',
    name: "legroft's blog"
  },
  {
    _id: '94fd6ca0634046af009a6cf14f205fc7',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://blog.baiyz.top/images/avatar.jpg',
    date: 1680709449000,
    descr: '学习 && Share && 只是快乐的生活~',
    link: 'https://blog.baiyz.top',
    name: 'Bai’s Blog'
  },
  {
    _id: 'cd045e75611f405e06c50fb16dc2fff8',
    _openid: '9bf44da2dbb8473da1fcf4f591cb82ff',
    avatar: 'https://img.lzxjack.top:99/202203311658877.webp',
    date: 1680709457000,
    descr: '好记性不如烂笔头',
    link: 'https://blog.imzjw.cn/',
    name: '小嘉的部落格'
  },
  {
    _id: 'cd045e75612b841a0897fd54380a8012',
    _openid: '9bf44da2dbb8473da1fcf4f591cb82ff',
    avatar: 'https://img.lzxjack.top:99/202203311718510.webp',
    date: 1680709466000,
    descr: 'Ordis’Blog',
    link: 'https://imbhj.com',
    name: 'Ordis'
  },
  {
    _id: 'd2fe6f206245278a034d81eb211e5b20',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://img.lzxjack.top:99/202203311200674.webp',
    date: 1680709472000,
    descr: '安全新人小醋的快乐收集处',
    link: 'https://www.litcu.cn/',
    name: 'Cu Blog'
  },

  {
    _id: '2cc84e2664319ed407d0c21855ba54ad',
    _openid: 'dbee9976b3c14448a06f2006a4795cf2',
    avatar: 'https://img.lzxjack.top:99/202304090106039.jpg',
    date: 1680973524949,
    descr: '追求让人充实，分享让人快乐',
    link: 'https://blog.lovelu.top',
    name: '满心Hrn'
  },
  {
    _id: '7dc1d502652bb809071435e53398f99d',
    _openid: '41fcc65978324a8db4048993dfc0a9df',
    avatar: 'https://pljzy.top/images/logo4.jpg',
    date: 1697363990964,
    descr: '一个技术探索与分享的平台',
    link: 'https://pljzy.top/',
    name: 'ZY 知识库'
  },
  {
    _id: '7027b654656954b201b0708e30ff896b',
    _openid: '41fcc65978324a8db4048993dfc0a9df',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1010988124&s=100',
    date: 1701401777732,
    descr: '个人学习博客',
    link: 'https://blog.yedeqin.com/',
    name: '叶德钦的个人博客'
  },
  {
    _id: '09e7876865714b280280a4d010593658',
    _openid: '41fcc65978324a8db4048993dfc0a9df',
    avatar: 'https://skyline523.github.io/assets/logo.svg',
    date: 1701923624113,
    descr: '我会找到办法的，我总有办法',
    link: 'https://skyline523.github.io/',
    name: 'Leet'
  }
];

const FriendLink: FunctionComponent = () => {
  return (
    <section className={Styles['link-wrap']}>
      <Card title="友链">
        {linkConfig.map((item: any) => (
          <Card.Grid
            key={item._id}
            onClick={() => {
              window.open(item.link, '_blank');
            }}
            className={Styles['link']}
            style={gridStyle}
          >
            <Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.name}
              description={item.descr}
            />
          </Card.Grid>
        ))}
      </Card>
    </section>
  );
};

export default FriendLink;
