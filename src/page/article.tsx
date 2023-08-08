import React from 'react';
import ContentLayout from '../components/layout';
import MdViewer from '../components/md-view';
import { Divider, message } from 'antd';
import { useParams } from 'react-router-dom';
import { ArticleList, Axios } from '../http/api';
import MarkdownToc from '../components/MarkdownToc';
import CommentForm from '../components/commentForm';
import CommentList from '../components/commentList';
import Styles from './article.module.scss';

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
      <article>
        <MdViewer value={article?.markdown}></MdViewer>
        <section className={Styles['comment-list']}>
          <Divider style={{ marginTop: 30 }}>我要发表看法</Divider>
          <div style={{ width: '45vw', margin: 'auto' }}>
            <CommentForm isReply={false}></CommentForm>
          </div>
          <CommentList></CommentList>
        </section>
      </article>
      <MarkdownToc article={article}></MarkdownToc>
    </ContentLayout>
  );
};

export default Article;
