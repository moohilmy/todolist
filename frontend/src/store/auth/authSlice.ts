import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "@types";
import actAuthRegister from "./act/actRegister";
import actAuthLogin from "./act/actAuthLogin";
import actUpdateUser from "./act/actUpdateUser";
import actUpdatePassword from "./act/actUpdatepassword";
import actDeleteUser from "./act/actDeleteuser";
import actVerifyAccount from "./act/actVerifyAccount";
import {actResetLinkPassword,actCheckResetLinkPassword, actResetPassword} from './act/actResetPassword'
interface IAuthState {
  user: {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    isVerified: boolean;
  } | null;
  token: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action?.payload)) state.error = action.payload;
    });

    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(actUpdateUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actUpdateUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload || null;
    });
    builder.addCase(actUpdateUser.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    builder.addCase(actUpdatePassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actUpdatePassword.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actUpdatePassword.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
    builder.addCase(actDeleteUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actDeleteUser.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actDeleteUser.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
    builder.addCase(actVerifyAccount.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actVerifyAccount.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actVerifyAccount.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
    builder.addCase(actResetLinkPassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actResetLinkPassword.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actResetLinkPassword.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});
export {
  actAuthRegister,
  actAuthLogin,
  actUpdateUser,
  actUpdatePassword,
  actDeleteUser,
  actVerifyAccount,
  actResetLinkPassword,
  actCheckResetLinkPassword,
  actResetPassword
};
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
