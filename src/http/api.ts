import { request } from './http';

export interface ArticleList {
  id: string;
  title: string;
  content?: string;
  markdown: string;
  cover_image?: string;
  read_count: number;
  article_type: string;
  create_time: string;
}

export class Axios {
  // public static getArticle() {
  //     return request('/article/6218b68caa5c617aba1f5b690', 'get')
  // }

  public static async getArticleList(data: { page: number; pageSize: number }): Promise<{
    data: ArticleList[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const response = await request('/getArticleList', 'post', data);
    if (typeof response === 'boolean') {
      throw new Error('Request failed');
    }
    return response.data;
  }
}
