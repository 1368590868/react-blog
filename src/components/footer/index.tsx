import { FC } from 'react';
import Style from './footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={Style['footer-wrapper']}>
      <span>
        备案号:
        <a href="https://beian.miit.gov.cn" target="_blank">
          渝ICP备19017809号
        </a>
      </span>
      <span>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50024102500401"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
          }}
        >
          <img src="../../../public/gongan.webp" alt="公安" />
          渝公网安备 50024102500401号
        </a>
      </span>
      <span>CopyRight © 2023 - 2025 - 木木 - ALL RIGHTS RESERVED</span>
    </footer>
  );
};

export default Footer;
