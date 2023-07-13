import React from 'react';
import ContentLayout from '../components/layout';
import MdViewer from '../components/md-view';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { ArticleList, Axios } from '../http/api';
import MarkdownToc from '../components/MarkdownToc';

const Article = () => {
  const params = useParams();
  const [article, setArticle] = React.useState<ArticleList>();

  React.useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      if (!params?.id) return;

      const res = await Axios.getArticleById(params.id);
      setArticle(res.data);
    } catch (error) {
      message.error('获取文章失败');
    } finally {
    }
  };
  return (
    <ContentLayout>
      <MdViewer value={article?.markdown}></MdViewer>
      <MarkdownToc article={article}></MarkdownToc>
    </ContentLayout>
  );
};

export default Article;
