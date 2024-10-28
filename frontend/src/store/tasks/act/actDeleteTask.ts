import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@utils/request";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { toast } from "react-toastify";
import { RootState } from "@store/index";

type TResponse ={
    message: string;
    taskId: number
}

const actDeleteTask = createAsyncThunk('tasks/actDeleteTask',async(taskId : number,thunkAPI)=>{
    const {rejectWithValue , getState} = thunkAPI
    const { auth : { token}} = getState() as RootState;
    try {
        
        const res = await request.delete<TResponse>(`/api/tasks/task/delete/${taskId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        toast.success(res.data.message)
        return res.data.taskId
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
    }
})

export default actDeleteTask