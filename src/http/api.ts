import { request } from './http';

export interface ArticleList {
  id: string;
  title: string;
  content?: string;
  markdown: string;
  cover_image?: string;
  read_count: string;
  article_type: string;
  create_time: string;
}

export interface APIResponse<T> {
  code: number;
  data: T;
}

export class Axios {
  /**
   * 根据id获取文章详情
   */
  public static async getArticleById(id: string): Promise<APIResponse<ArticleList>> {
    const response = await request(`/getArticleDetail/${id}`, 'get', {});
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data
  }

  /**
   * 
   * @param data | page: number; pageSize: number
   */
  public static async getArticleList(data: { page: number; pageSize: number }): Promise<APIResponse<{
    data: ArticleList[];
    total: number;
    page: number;
    pageSize: number;
  }>> {
    const response = await request('/getArticleList', 'post', data);
    if (typeof response === 'boolean') {
      throw new Error('Request failed');
    }
    return response.data;
  }
}
