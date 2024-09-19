import { createSlice } from "@reduxjs/toolkit";

export interface AuthUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserProps {
  user: AuthUserData | null;
  isLogin: boolean;
  isAuthLoading: boolean;
}

const initialState:UserProps = {
  user: null,
  isLogin: false,
  isAuthLoading: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
    },
    setIsLoading(state, action) {
      state.isAuthLoading = action.payload
    }
  },
});

export const {login, logout, setIsLoading} = authSlice.actions;
export default authSlice.reducer;