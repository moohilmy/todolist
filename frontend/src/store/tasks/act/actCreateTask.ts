import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@utils/request";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { toast } from "react-toastify";
import { RootState } from "@store/index";
import { TTaks } from "@types";

type TFormData = {
    taskName: string;
    description: string;
}

type TResponse = {
    task : TTaks
    message: string;
}

const actCreateTask = createAsyncThunk('tasks/actCreateTask', async (formData:TFormData, thunkAPI)=>{
    const { rejectWithValue, getState } = thunkAPI;
    const { auth: {user , token}} = getState() as RootState;
    try {
        const res = await request.post<TResponse>(`/api/tasks/user/${user?.id}`, formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(res.data.message)
        return res.data.task
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
    }
})

export default actCreateTask;