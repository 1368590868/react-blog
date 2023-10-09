import { request } from './http';

export interface ArticleList {
  id: string;
  title: string;
  content?: string;
  markdown: string;
  cover_image?: string;
  read_count: string;
  article_type: string;
  createTime: string;
  comments: string;
  tags: TagsList[];
}

export interface ArticleParams {
  page: number;
  pageSize: number;
  tags: string[] | [];
}

export interface APIResponse<T> {
  code: number;
  data: T;
}

export const PAGENATION = {
  page: 1,
  pageSize: 5,
};

export class Axios {
  /**
   * 根据id获取文章详情
   */
  public static async getArticleById(id: string): Promise<APIResponse<ArticleList>> {
    const response = await request(`/getArticleById/${id}`, 'get', {});
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data;
  }

  /**
   *
   * @param data | page: number; pageSize: number
   */
  public static async getArticleList(data: ArticleParams): Promise<
    APIResponse<{
      data: ArticleList[];
      total: number;
      page: number;
      pageSize: number;
    }>
  > {
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
  color?: string;
}

export class TagsService {
  /**
   * 获取Tags列表
   */
  public static async getTagsList(): Promise<APIResponse<TagsList[]>> {
    const response = await request(`/getTag`, 'get', {});
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data;
  }
}

export interface CommentList {
  id?: string;
  content: string;
  userName: string;
  email: string;
  website?: string;
  createTime?: string;
  replys?: CommentList[];
}

export class CommentService {
  // 添加评论
  public static async addComment(data: CommentList, id: string): Promise<APIResponse<CommentList>> {
    const response = await request(`/addComment/${id}`, 'post', data);
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data;
  }

  // 评论回复
  public static async addReply(data: CommentList, id: string): Promise<APIResponse<CommentList>> {
    const response = await request(`/addReply/${id}`, 'post', data);
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data;
  }

  // 获取评论列表
  public static async getCommentList(id: string): Promise<APIResponse<CommentList[]>> {
    const response = await request(`/getCommentList/${id}`, 'get', {});
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data;
  }
}

export class ReplyService {
  // 评论回复
  public static async addReply(data: CommentList, id: string): Promise<APIResponse<CommentList>> {
    const response = await request(`/addReply/${id}`, 'post', data);
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data;
  }

  // 获取评论列表
  public static async getReplyList(id: string): Promise<APIResponse<CommentList[]>> {
    const response = await request(`/getReplyList/${id}`, 'get', {});
    if (typeof response === 'boolean') throw new Error('Request failed');
    return response.data;
  }
}
