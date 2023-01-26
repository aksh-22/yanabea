import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginDataType} from 'typings/login-data-type';

interface UProps {
  user: loginDataType;
}

const initialState: UProps = {
  user: {},
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    updateUser(state: UProps, action: PayloadAction<object>) {
      state.user = action.payload;
    },
  },
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer;
