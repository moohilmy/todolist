import request from "@utils/request";
import {toast} from 'react-toastify'
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";

type TFormData = {
    id: string;
    token: string;
}

const actVerifyAccount = createAsyncThunk('auth/actVerifyAccount', async (Formdata: TFormData, thunkAPI) => {
    const {rejectWithValue } = thunkAPI
    try {
        const res = await request.get<{message: string}>(`/api/auth/verify/${Formdata.id}/token/${Formdata.token}`)
        toast.success(res.data.message)
    } catch (error) {
        rejectWithValue(AxiosErrorHandler(error))
    }
})

export default actVerifyAccount;