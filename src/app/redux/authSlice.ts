import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;






