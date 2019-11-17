import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './Menu.less';

export interface MenuItem {
  name: string;
  icon?: string;
  onClick?: () => void;
  submenu: MenuItem[] | null;
  link?: string;
}

interface IMenuProps {
  menu: MenuItem[];
}

const Menu: React.FunctionComponent<IMenuProps> = function Menu(props: IMenuProps) {
  const menu = props.menu;
  return MenuItem(menu) as React.ReactElement;
}

function easeOut(t: number, b: number, c: number, d: number): number {
  return -c * (t /= d) * (t - 2) + b;
}

function toggleCollapse(e: React.MouseEvent) {
  let target = e.target as HTMLDivElement;
  while (!target.classList.contains('menu-title')) {
    target = target.parentElement as HTMLDivElement;
  }
  const parentElement = target.parentElement as HTMLDivElement;
  const lastChildElement = parentElement.lastElementChild as HTMLDivElement;
  parentElement.classList.toggle('collapse');
  const isCollapse = parentElement.classList.contains('collapse');
  const childHeight = lastChildElement.scrollHeight;
  let currentHeight = isCollapse ? childHeight : 0;
  const destHeight = isCollapse ? 0 : childHeight;
  const time = 0.1;
  const step = childHeight / (60 * time);
  const openOrCollapse = () => {
    if ((isCollapse && currentHeight > destHeight + 2) || (!isCollapse && currentHeight < destHeight - 2)) {
      const changeHeight = easeOut(isCollapse ? currentHeight : childHeight - currentHeight, 0, step, childHeight);
      currentHeight += isCollapse ? -changeHeight : changeHeight;
      lastChildElement.style.height = currentHeight + 'px';
      requestAnimationFrame(openOrCollapse);
    } else {
      lastChildElement.style.height = isCollapse ? '0px' : 'auto';
    }
  }
  openOrCollapse();
}

function MenuItem(items: MenuItem[]) {
  return (
    <>
      {items.map((item: MenuItem, index) => {
        if (item.submenu && item.submenu.length) {
          return (
            <div className={classnames("menu-container", "collapse")} key={item.name + index}>
              <div className="menu-title" onClick={toggleCollapse}>
                <span>
                  {item.icon && <i className={`arrow iconfont ${item.icon}`}></i>}
                  {item.name}
                </span>
                <i className="arrow iconfont iconicon-test"></i>
              </div>
              <div className="submenu" style={{ height: 0 }}>
                {MenuItem(item.submenu)}
              </div>
            </div>
          );
        } else {
          if (item.link) {
            return (
              <Link to={item.link} key={item.name + index}>
                <div
                  className="menu-title"
                  onClick={item.onClick || (() => { })}
                >
                  {item.name}
                </div>
              </Link>
            )
          } else {
            return (
              <div
                className="menu-title"
                key={item.name + index}
                onClick={item.onClick || (() => { })}
              >
                {item.name}
              </div>
            )
          }
        }
      })}
    </>
  )
}

export default Menu;