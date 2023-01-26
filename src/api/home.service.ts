import {axiosInstance} from './axiosInstance';

export const stockCountData = () =>
  axiosInstance.post('stock-remaining-qty').then(res => res?.data);
