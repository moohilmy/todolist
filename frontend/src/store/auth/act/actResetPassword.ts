import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import request from "@utils/request";
import { toast } from "react-toastify";

export const actResetLinkPassword = createAsyncThunk(
  "auth/actResetLinkPassword",
  async (email: string, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await request.post("/api/password/reset-password", {
        email,
      });

      toast.success(res.data.message);
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);


type TResetPasswordData = {
    id: string;
    token: string;
}
export const actCheckResetLinkPassword = createAsyncThunk(
  "auth/actCheckResetLinkPassword",
  async (formData: TResetPasswordData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
        const res = await request.get(`/api/password/reset-password/${formData.id}/token/${formData.token}`)
        
        toast.success(res.data.message)
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
    }
  }
);


type TformData = {
    password: string;
    token: string;
    id: string;
}
export const actResetPassword = createAsyncThunk(
  "auth/actResetPassword",
  async (formData: TformData, thunk) => {
    const { rejectWithValue } = thunk
    try {
        const res = await request.post(`/api/password/reset-password/${formData.id}/token/${formData.token}`, {
            password: formData.password,
        })
        
        toast.success(res.data.message)
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
    }
  })