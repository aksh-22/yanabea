import axios from 'axios';
import i18next from 'i18next';
import {getModel, getVersion} from 'react-native-device-info';
import {getTimeZone} from 'react-native-localize';
import {showMessage} from 'src/components/InfoModal';
import store from 'src/redux/store';
import {axiosError} from './axiosError';

const url = 'https://yanabeaapp.com/api/v2/Warehouse';
// const url = 'https://yanabeaapp.com/staging/api/v2/Warehouse/';

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
    let token = store.getState()?.userReducer?.user?.token;
    let language = i18next.language;

    request.baseURL = __DEV__ ? url : url;
    if (request.headers) {
      request.headers.Authorization = `Bearer ${token}`;
      request.headers.ln = language;
      // request.headers.lng = language;
    }
    return request;
  },
  error => {
    throw error;
  },
);
// Add a response interceptor
axiosInstance.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res;
    } else {
      if (res.data.code === 401) {
        store.dispatch({
          type: 'CLEAR_REDUX',
        });
      } else {
        showMessage({
          isVisible: true,
          message: res?.data?.message,
        });
      }
      throw res?.data?.message;
    }
  },
  err => axiosError(err),
);
export {axiosInstance};
