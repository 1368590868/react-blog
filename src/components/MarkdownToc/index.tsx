import { Affix, Card } from 'antd';
import React, { useEffect } from 'react';
// @ts-ignore
import MarkdownNavbar from './markdown-navbar.jsx';
import './index.scss';
import { ArticleList } from '../../http/api';
import { throttle } from 'lodash';

interface Props {
  article: ArticleList | undefined;
}

/**
 * Markdown Toc 组件
 * @param props
 * @constructor
 */
const MarkdownToc: React.FC<Props> = (props) => {
  const { article } = props;
  const NAVBAR_MIDDLE = 250;
  const onScroll = () => {
    const activeItem = document.querySelector('.active') as HTMLElement;
    if (activeItem) {
      const offsetTop = activeItem.offsetTop;
      const navbar = document.querySelector('.markdown-navigation');
      if (offsetTop > NAVBAR_MIDDLE && navbar) {
        navbar.scrollTop = offsetTop - NAVBAR_MIDDLE;
      } else {
        navbar!.scrollTop = 0;
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', throttle(onScroll, 200));
    return () => {
      window.removeEventListener('scroll', throttle(onScroll, 200));
    };
  }, []);

  // 仅展示markdown格式的文章，且有1~4级目录
  if (article && article.markdown) {
    const headerRegex = /^#{1,4} +/m;
    const hasHeader = headerRegex.test(article.markdown);
    return hasHeader ? (
      <Affix offsetTop={120} style={{ marginLeft: '3rem', width: '30rem' }}>
        <Card title="目录" className="toc-card" bordered={false}>
          <MarkdownNavbar source={article.markdown} ordered={false} maxDepth={4} />
        </Card>
      </Affix>
    ) : (
      <></>
    );
  } else {
    return <></>;
  }
};

export default MarkdownToc;
