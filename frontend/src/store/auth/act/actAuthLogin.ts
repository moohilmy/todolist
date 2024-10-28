import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@utils/request";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { toast } from "react-toastify";
type TFormData = {
    email: string;
    password: string;
}
type TResponse = {
    user:{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        userName: string;
        isVerified: boolean;
    }
    token: string;
}
const actAuthLogin = createAsyncThunk('auth/actAuthLogin', async (formData:TFormData, thunk)=>{
    const { rejectWithValue} = thunk;
    try {
        const res = await request.post<TResponse>('/api/auth/login', formData)
        toast.success("log in successfully")
        return res.data
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
    }
})

export default actAuthLogin