import React from 'react';

import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  menu: any[];
  children: JSX.Element;
}

export const HeaderDropDown: React.FC<Props> = ({ menu, children }) => {
  function renderMenuItem(item: any, idx: number) {
    item.url = item.path;
    let icon;
    let menuItem;
    if (item.icon) {
      icon = (
        <div className="flex flex-ai-c flex-jc-c fs-xm lh-none p0 m0 mr10">
          {item.icon}
        </div>
      );
    }

    const clazz =
      'hallar-menu-item rounded w250--fixed fc-gray-800 click flex-c flex-ww';
    if (item.action) {
      menuItem = (
        <div className={clazz} onClick={() => item.action(item.value)}>
          {icon}
          <div className="">
            <span className="m0 p0 lh-none">{item.label}</span>
          </div>
        </div>
      );
    } else if (item.href) {
      menuItem = (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={clazz}>
          {icon}
          <span>{item.label}</span>
        </a>
      );
    } else {
      menuItem = (
        <Link className={clazz} to={item.url}>
          {icon}
          <span>{item.label}</span>
        </Link>
      );
    }
    return menuItem;
  }

  return (
    <Dropdown
      overlay={
        <Menu className="bg--dd-menu">
          {menu.map((menu_item: any, idx) => {
            if (menu_item.divide) return <Menu.Divider className="" />;
            return (
              <Menu.Item key={idx}>{renderMenuItem(menu_item, idx)}</Menu.Item>
            );
          })}
        </Menu>
      }
      placement="bottomRight"
      trigger={['click']}>
      {children}
    </Dropdown>
  );
};
