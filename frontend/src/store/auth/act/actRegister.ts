import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import request from "@utils/request";
import { toast } from "react-toastify";

type TFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    userName: string
}

const actAuthRegister = createAsyncThunk('auth/actAuthRegister',
    async (formData: TFormData,thunk) => {
        const { rejectWithValue} = thunk
        try {
            const res = await request.post('/api/auth/register', formData)
            
            toast.success(res.data.message)
            
            return res.data;
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))
        }
    }
)

export default actAuthRegister