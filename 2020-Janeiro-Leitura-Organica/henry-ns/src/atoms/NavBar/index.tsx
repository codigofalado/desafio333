import React, { FC } from 'react';

import { Link } from 'gatsby';

import { NavItem } from './styles';

export type Item = {
  id: string;
  title: string;
  href: string;
};

interface Props {
  items: Item[];
  selected: string;
  onClick: (item: Item) => void;
}

const NavBar: FC<Props> = ({ items, onClick, selected }) => (
  <nav>
    <ul>
      {items.map(item => (
        <NavItem key={item.id} selected={selected === item.id}>
          <Link to={item.href} onClick={() => onClick(item)}>
            {item.title}
          </Link>
        </NavItem>
      ))}
    </ul>
  </nav>
);
export default NavBar;
