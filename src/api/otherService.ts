import axios from 'axios';
import i18next from 'i18next';
import {getModel, getVersion} from 'react-native-device-info';
import {getTimeZone} from 'react-native-localize';
import store from 'src/redux/store';
import {axiosError} from './axiosError';

const url = 'https://yanabeaapp.com/staging/api/';

let lng = i18next.language;

const axiosInstance = axios.create({
  timeout: 30000,
  timeoutErrorMessage:
    'Network request timed out. The app could not connect to the server. Please make sure you are connected with a good network.',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'App-Version': getVersion(),
    Timezone: getTimeZone(),
    'Device-Model': getModel(),
  },
});
axiosInstance.interceptors.request.use(
  request => {
    let token = store.getState()?.userReducer?.token;

    request.baseURL = url;
    if (request.headers) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  error => {
    throw error;
  },
);
// Add a response interceptor
axiosInstance.interceptors.response.use(
  res => res.status === 200 && res,
  err => axiosError(err),
);

export const getCities = () =>
  axiosInstance
    .post('get_cities', {
      lng,
    })
    .then(res => res?.data);

export const getSupplierId = () =>
  axiosInstance.get('v2/get_supplier').then(res => res?.data);
