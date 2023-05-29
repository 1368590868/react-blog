import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { Menu } from 'antd';
import Styles from './nav.module.scss'
import { SettingTwoTone } from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
        label: '文章',
        key: 'article',
    },
    {
        label: 'Navigation Two',
        key: 'app',
    },
    {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        label: 'Navigation Four',
        key: 'alipay',
    },
];

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

    return <header className={Styles['navbar']}>
        <div className={Styles['logo']}>

        </div>
        <Menu onClick={onClick}
            style={{ flex: "auto", minWidth: 0 }}
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


};

export default Nav;