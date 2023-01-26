import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer/rootReducer';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'yanabea',
  storage: AsyncStorage,
};

const root_reducer = (state: any, action: AnyAction) => {
  let reduxState = state;
  if (action.type === 'CLEAR_REDUX') {
    for (let [key, value] of Object.entries(reduxState)) {
      if (key === 'appReducer') {
        reduxState[key] = value;
      } else {
        reduxState[key] = undefined;
      }
    }
    state = reduxState;
  }

  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, root_reducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  ],
});
