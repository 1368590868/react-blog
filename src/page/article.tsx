import React from 'react';
import ContentLayout from '../components/layout/content-layout';
import MdViewer from '../components/md-view';

function Article() {
  return (
    <ContentLayout>
      <MdViewer></MdViewer>
    </ContentLayout>
  );
}

export default Article;
