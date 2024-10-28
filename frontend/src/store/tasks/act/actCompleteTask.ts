import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@utils/request";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { toast } from "react-toastify";
import { RootState } from "@store/index";
import { TTask } from "@types";
import { completeTask } from "../taskSlice";
type TResponse ={
    message: string;
    task: TTask;
}
const actCompleteTask = createAsyncThunk('tasks/actCompleteTask',async(id:number,thunkAPI)=>{
    const {getState,rejectWithValue, dispatch} = thunkAPI
    const { auth : { token }} = getState() as RootState
    try {
        const res = await request.get<TResponse>(`/api/tasks/task/complete/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(res?.data?.message)
        dispatch(completeTask(id))
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
    }
})

export default actCompleteTask;