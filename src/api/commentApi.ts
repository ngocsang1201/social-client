import { IComment } from 'models';
import axiosClient from './axiosClient';

export const commentApi = {
  getPostComment(postId: string) {
    const url = '/comments';
    return axiosClient.get(url, { params: { postId } });
  },
  create(data: IComment) {
    const url = '/comments';
    return axiosClient.post(url, data);
  },
  edit(data: IComment) {
    const url = `/comments/${data._id}`;
    return axiosClient.patch(url, data);
  },
  remove(data: IComment) {
    const url = `/comments/${data._id}`;
    return axiosClient.delete(url);
  },
  like(id: string) {
    const url = `/comments/${id}/like`;
    return axiosClient.post(url);
  },
};
