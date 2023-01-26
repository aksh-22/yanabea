import {axiosInstance} from './axiosInstance';

export const filterReportData = data =>
  axiosInstance.post('filter-data', data).then(res => res?.data);

export const reportData = data =>
  axiosInstance.post('order-dispatch-detail', data).then(res => res?.data);

export const getReportDataByQr = data =>
  axiosInstance.post('order-detail', data).then(res => res?.data);

export const getReportDataByDate = data =>
  axiosInstance.post('datewise-order-disptched', data).then(res => res?.data);
