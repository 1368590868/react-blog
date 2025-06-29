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
import 'bytemd/dist/index.css';
import 'highlight.js/styles/school-book.css';
import 'github-markdown-css/github-markdown-light.css';
import Style from './md-view.module.scss';
// Plugins
import { roughNotationPlugin, pluginCopyCode } from 'plugin-bytemd-rough';
import imageLazyLoad from './plugin/img-lazy';

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
  roughNotationPlugin(),
  pluginCopyCode(),
  imageLazyLoad({
    useNativeLazy: false,
    placeholderSrc: '/loading.gif',
  })
];

const MdViewer: FC<Props> = ({ value = '' }) => (
  <article className={Style['md-viewer']}>
    <Viewer value={value} plugins={plugins} />
  </article>
);

export default MdViewer;
