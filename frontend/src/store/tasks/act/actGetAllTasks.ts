import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@utils/request";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { TTaks } from "@types";
import { RootState } from "@store/index";

type TResponse = {
    tasks: TTaks[]
}

const actGetAllTasks = createAsyncThunk(
    "tasks/actGetAllTasks",
    async (_,thunkAPI) => {
        const { getState, rejectWithValue } = thunkAPI;
        const { auth : { user , token} } = getState() as RootState;
        try {
            
            const res =await request.get<TResponse>(`/api/tasks/user/${user?.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return res.data
            
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))
        }
    })

export default actGetAllTasks;