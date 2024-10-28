import request from "@utils/request";
import {toast} from 'react-toastify'
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { RootState } from "@store/index";

type TResData = {
    user:{
        email: string;
        firstName: string;
        lastName: string;
        userName: string;
        isVerified: boolean;
    },
    message: string;
}
type TFormData = {
        email: string;
        firstName: string;
        lastName: string;
        userName: string;
}

const actUpdateUser = createAsyncThunk('auth/actUpdateUser',
    async (formData: TFormData, thunkAPI) => {
        const {getState , rejectWithValue } = thunkAPI
        const { auth : { user , token} } = getState() as RootState;
        if (!user || !token) {
            return rejectWithValue('User or token is not authenticated');
        }
        try {
            const res = await request.put<TResData>(`/api/user/update/${user.id}`, formData  ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(res.data.message)
            return res.data.user
            
        } catch (error) {
            rejectWithValue(AxiosErrorHandler(error))
        }
    })

export default actUpdateUser