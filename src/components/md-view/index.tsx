import type { FC } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import mermaid from '@bytemd/plugin-mermaid';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import { annotate, annotationGroup } from 'rough-notation'; // 引入 annotationGroup
import 'bytemd/dist/index.css';
import 'highlight.js/styles/school-book.css';
import 'github-markdown-css/github-markdown-light.css';
import Style from './md-view.module.scss';

interface Props {
  value?: string;
}

// bytemd 插件配置
const plugins = [
  gfm({ locale: gfmLocale }),
  gemoji(),
  highlight(),
  math({ locale: mathLocale }),
  mermaid({ locale: mermaidLocale }),
  mediumZoom(),
  {
    // 在 Markdown 渲染完成后执行的回调函数，用于添加自定义的样式或行为
    viewerEffect: ({ markdownBody }: { markdownBody: HTMLElement }) => {
      /**
       * 使用 rough-notation 插件创建注释组及增加动画配置
       * @param selector 选择器
       * @param options  配置项
       */
      const createAnnotations = (selector: string, options: Parameters<typeof annotate>[1]) => {
        const elements = markdownBody.querySelectorAll(selector);
        const annotations = Array.from(elements)
          .filter((el): el is HTMLElement => el instanceof HTMLElement)
          .map((el) => annotate(el, options));
        const group = annotationGroup(annotations);
        group.show();
      };

      createAnnotations('strong', {
        type: 'box',
        color: '#4a148c',
        animate: true,
        animationDuration: 1000,
        strokeWidth: 1
      });

      createAnnotations('blockquote', {
        type: 'highlight',
        brackets: ["left", "right"],
        color: "#C4C2C3",
        multiline: true,
        animate: true,
        animationDuration: 1000,
        strokeWidth: 1
      });
      

      createAnnotations('ol, ul', {
        type: 'bracket',
        color: '#B36C4C',
        animate: true,
        animationDuration: 1000,
        strokeWidth: 4,
        brackets: ['left', 'right']
      });

      createAnnotations('del', {
        type: 'crossed-off',
        color: '#b71c1c',
        animate: true,
        animationDuration: 1000,
        strokeWidth: 1
      });

      createAnnotations('em', {
        type: 'highlight',
        color: '#ffd54f',
        animate: true,
        animationDuration: 1000,
        strokeWidth: 1
      });
    }
  }
];

const MdViewer: FC<Props> = ({ value = '' }) => (
  <article className={Style['md-viewer']}>
    <Viewer value={value} plugins={plugins} />
  </article>
);

export default MdViewer;
