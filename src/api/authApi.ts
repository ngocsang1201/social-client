import { IAuthFormValues, IChangePasswordFormValues, IUser } from 'models';
import axiosClient from './axiosClient';

const authApi = {
  login(data: IAuthFormValues) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  register(data: IAuthFormValues) {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
  googleLogin(idToken: string) {
    const url = '/auth/google-login';
    return axiosClient.post(url, { idToken });
  },
  active(token: string) {
    const url = '/auth/active';
    return axiosClient.post(url, { token });
  },
  changePassword(data: IChangePasswordFormValues) {
    const url = '/auth/password/change';
    return axiosClient.post(url, data);
  },
  forgotPassword(email: string) {
    const url = '/auth/password/forgot';
    return axiosClient.post(url, { email });
  },
  resetPassword(data: IChangePasswordFormValues) {
    const url = '/auth/password/reset';
    return axiosClient.post(url, data);
  },
};

export default authApi;
