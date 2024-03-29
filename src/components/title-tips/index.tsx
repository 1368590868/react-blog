import React, { useEffect, useState } from 'react';
import Style from './title-tips.module.scss';
import * as getPoem from 'jinrishici';

const TitleTips: React.FC = () => {
  const [poem, setPoem] = useState('');

  useEffect(() => {
    getPoem.load((res: { data: { content: React.SetStateAction<string> } }) => {
      setPoem(res.data.content);
    });
  }, []);
  // Axios.getArticle().then(res => { console.log(res) })
  return (
    <section className={`${Style['title-wrap']} css-var-r0`}>
      <div className={Style.header}>
        <div className={Style.title}>Taric Blog</div>
        {poem && (
          <div className={Style.typewriter}>
            <h1>{poem}</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default TitleTips;
