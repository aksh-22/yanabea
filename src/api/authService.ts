import {axiosInstance} from './axiosInstance';

export const registerWarehouse = (data: any) =>
  axiosInstance.post('register-warehouse', data).then(res => res?.data);

export const loginWarehouse = (data: any) =>
  axiosInstance.post('login-warehouse', data).then(res => res?.data);

export const profileEdit = (data: any) =>
  axiosInstance.post('profile-edit', data).then(res => res?.data);

export const profileGet = () =>
  axiosInstance.post('profile-get').then(res => res?.data);

export const logout = () => axiosInstance.post('logout').then(res => res?.data);
