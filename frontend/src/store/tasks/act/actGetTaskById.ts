import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import {  TTask } from "@types";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import request from "@utils/request";

const actGetTaskById = createAsyncThunk('tasks/actGetTaskById',async(taskId: string, thunkAPI)=>{
    const {getState, rejectWithValue} = thunkAPI
    const { auth : {user, token }} = getState() as RootState
    try {
        const res = await request.get<TTask>(`/api/tasks/user/${user?.id}/task/${taskId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
        
    }
})


export default actGetTaskById;