import request from "@utils/request";
import {toast} from 'react-toastify'
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import { RootState } from "@store/index";
import { TTaks } from "@types";
import { updateTasks } from "../taskSlice";
type TFormData = {
    taskName: string,
    description: string
}
const actUpdateTask = createAsyncThunk('tasks/actUpdateTask',async(formData:TFormData,thunkAPI)=>{
    const {getState,rejectWithValue,dispatch} = thunkAPI
    const { auth : { token }, tasks: { task}} = getState() as RootState
    try {
        const res = await request.put<TTaks>(`/api/tasks/task/update/${task._id}`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success('Task updated successfully')
        dispatch(updateTasks(res.data))
        return res.data
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error))
    }
})

export default actUpdateTask;