import request from "@utils/request";
import {toast} from 'react-toastify'
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { RootState } from "@store/index";
import { authLogout } from "../authSlice";

type TResData = {
    message: string;
};

const actUpdatePassword = createAsyncThunk('auth/actUpdatePassword',
    async (formData: string, thunkAPI) => {
        const {getState , rejectWithValue, dispatch } = thunkAPI
        const { auth : { user , token} } = getState() as RootState;
        if (!user || !token) {
            return rejectWithValue('User or token is not authenticated');
        }
        try {
            const res = await request.put<TResData>(`/api/password/update-password/${user.id}`, {
                password: formData
            }  ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(res.data.message)
            dispatch(authLogout())
        } catch (error) {
            rejectWithValue(AxiosErrorHandler(error))
        }
    })

export default actUpdatePassword