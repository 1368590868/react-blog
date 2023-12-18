import React, { useContext, useState } from 'react';
import { Dropdown, MenuProps, Radio } from 'antd';
import { Menu } from 'antd';
import Styles from './nav.module.scss';
import { SettingTwoTone } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext, initThemeConfig } from '../../App';

const getAssetsFile = (url: string) => {
  return new URL(`../../assets/${url}`, import.meta.url).href;
};

const defaultTheme = JSON.parse(localStorage.getItem('theme') ?? '{}');

const Nav: React.FC = () => {
  const [current, setCurrent] = useState('/article');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const history = useNavigate();
  const location = useLocation();
  const items: MenuProps['items'] = [
    {
      label: '文章',
      key: '/article',
      onClick: () => {
        history('/');
      }
    },
    {
      label: 'Nuxt Blog',
      key: '/app',
      onClick: () => {
        window.open('https://irlin.cn', '_blank');
      }
    },
    {
      label: '添加友链',
      key: '/friend-link',
      onClick: () => {
        history('/friend-link');
      }
    }
  ];
  const theme = useContext<any>(ThemeContext);

  React.useEffect(() => {
    settingItems.find((x) => x.key === defaultTheme.key)?.onClick();
  }, [defaultTheme]);

  React.useEffect(() => {
    setCurrent(location.pathname);
  }, []);

  const settingItems = [
    {
      key: '1',
      label: '黑色玫瑰',
      onClick: () => {
        document.documentElement.style.setProperty(
          `--background-image`,
          `url(https://cdn.irlin.cn/black.webp)`
        );

        theme.setThemeConfig(initThemeConfig);
        localStorage.setItem('theme', JSON.stringify({ key: '1', ...initThemeConfig }));
      }
    },
    {
      key: '2',
      label: '蓝色天空',
      onClick: () => {
        document.documentElement.style.setProperty(
          `--background-image`,
          `url(https://cdn.irlin.cn/blog/bg1.webp)`
        );

        const themes = {
          token: {
            colorPrimary: '#74b4da',
            colorInfo: '#74b4da',
            colorSuccess: '#52c41a',
            borderRadius: 7,
            wireframe: false,
            colorError: '#f5222d',
            sizeUnit: 6
          },
          components: {
            List: {
              algorithm: true
            },
            Dropdown: {
              algorithm: true
            }
          }
        };

        theme.setThemeConfig({
          ...themes
        });
        localStorage.setItem('theme', JSON.stringify({ key: '2', ...themes }));
      }
    },
    {
      key: '3',
      label: '绿色草原',
      onClick: () => {
        document.documentElement.style.setProperty(
          `--background-image`,
          `url(https://cdn.irlin.cn/2023-10-07_17-39-05_greenbg.webp)`
        );
        const themes = {
          token: {
            colorPrimary: '#00b96b',
            colorInfo: '#00b96b',
            colorSuccess: '#1677ff',
            borderRadius: 16,
            wireframe: true,
            colorError: '#f5222d'
          },
          components: {
            List: {
              algorithm: true
            },
            Dropdown: {
              algorithm: true
            }
          }
        };
        theme.setThemeConfig(themes);

        localStorage.setItem('theme', JSON.stringify({ key: '3', ...themes }));
      }
    }
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
        <Radio.Group defaultValue={defaultTheme.key ?? '1'} buttonStyle="solid">
          {settingItems.map((item) => {
            return (
              <Radio.Button value={item.key} key={item.key} onClick={item.onClick}>
                {item.label}{' '}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
    </header>
  );
};

export default Nav;
