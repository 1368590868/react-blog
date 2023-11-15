import { FC } from 'react';
import Style from './footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={Style['footer-wrapper']}>
      <span>已经滑到底底了~😮</span>
    </footer>
  );
};

export default Footer;
