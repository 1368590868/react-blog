import React, { FunctionComponent } from 'react';
import ArticleList from '../components/article-list';
import ContentLayout from '../components/layout/content-layout';
import SideBar from '../components/side-bar';
import TitleTips from '../components/title-tips';

const home: FunctionComponent = () => {
  return (
    <>
      <TitleTips />
      <ContentLayout>
        <ArticleList></ArticleList>
        <SideBar></SideBar>
      </ContentLayout>
    </>
  );
};

export default home;
