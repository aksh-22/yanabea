import {combineReducers} from '@reduxjs/toolkit';
import store from '../store';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export default rootReducer;
export type AppDispatch = typeof store.dispatch;
