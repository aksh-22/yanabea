import {AxiosError} from 'axios';
import {showMessage} from 'src/components/InfoModal';
import store from 'src/redux/store';

export const axiosError = async (err: AxiosError<any>) => {
  console.log('err', JSON.stringify(err, null, 2));
  if (err.response.status === 401) {
    store.dispatch({
      type: 'CLEAR_REDUX',
    });
  }
  showMessage({
    isVisible: true,
    message: err.response.data?.errors,
  });

  throw err;
};
