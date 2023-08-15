import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { Menu } from 'antd';
import Styles from './nav.module.scss';
import { SettingTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const settingItems: MenuProps['items'] = [
  {
    key: '1',
    label: '主题 1',
  },
  {
    key: '2',
    label: '主题 2',
  },
  {
    key: '3',
    label: '主题 3',
  },
];

const Nav: React.FC = () => {
  const [current, setCurrent] = useState('article');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const history = useNavigate();
  const items: MenuProps['items'] = [
    {
      label: '文章',
      key: 'article',
      onClick: () => {
        history('/');
      },
    },
    {
      label: 'Nuxt Blog',
      key: 'app',
      onClick: () => {
        window.open('https://irlin.cn', '_blank');
      },
    },
    {
      label: '添加友链',
      key: 'callMe',
      onClick: () => {
        // window.open('https://vue.irlin.cn', '_blank');
      },
    },
  ];

  return (
    <header className={Styles['navbar']}>
      <div className={Styles['logo']}></div>
      <Menu
        onClick={onClick}
        style={{ flex: 'auto', minWidth: 0 }}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div className={Styles['setting']}>
        <Dropdown
          menu={{
            items: settingItems,
            selectable: true,
            defaultSelectedKeys: ['1'],
          }}
        >
          <SettingTwoTone />
        </Dropdown>
      </div>
    </header>
  );
};

export default Nav;
