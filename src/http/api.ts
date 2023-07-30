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

export interface ArticleParams {
  page: number,
  pageSize: number,
  tags: string[] | []
}

export interface APIResponse<T> {
  code: number;
  data: T;
}

export const PAGENATION = {
  page: 1,
  pageSize: 10
}

export class Axios {
  /**
   * 根据id获取文章详情
   */
  public static async getArticleById(id: string): Promise<APIResponse<ArticleList>> {
    const response = await request(`/getArticleById/${id}`, 'get', {});
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data
  }

  /**
   * 
   * @param data | page: number; pageSize: number
   */
  public static async getArticleList(data: ArticleParams): Promise<APIResponse<{
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

export interface TagsList {
  id?: string;
  name?: string;
  color?: string
}

export class TagsService {
  /**
  * 获取Tags列表
  */
  public static async getTagsList(): Promise<APIResponse<TagsList[]>> {
    const response = await request(`/getTag`, 'get', {});
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data
  }
}