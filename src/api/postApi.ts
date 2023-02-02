import { ListParams, Post } from '~/models';
import axiosClient from './axiosClient';

export const postApi = {
  getAll(params: ListParams) {
    const url = '/posts';
    return axiosClient.get(url, { params });
  },
  getSavedList(params: ListParams) {
    const url = '/posts/saved';
    return axiosClient.get(url, { params });
  },
  getBySlug(slug: string) {
    const url = `/posts/detail/${slug}`;
    return axiosClient.get(url);
  },
  getForEdit(id: string): Promise<Post> {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  create(data: Post): Promise<Post> {
    const url = '/posts';
    return axiosClient.post(url, data);
  },
  update(data: Post): Promise<Post> {
    const url = `/posts/${data._id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string) {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
  like(id: string) {
    const url = `/posts/${id}/like`;
    return axiosClient.post(url);
  },
  save(id: string) {
    const url = `/posts/${id}/save`;
    return axiosClient.post(url);
  },
  unsave(id: string) {
    const url = `/posts/${id}/unsave`;
    return axiosClient.post(url);
  },
  search(q: string): Promise<Post[]> {
    const url = '/posts/search';
    return axiosClient.get(url, { params: { q } });
  },
};
