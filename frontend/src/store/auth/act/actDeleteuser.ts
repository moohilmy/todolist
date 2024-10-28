import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import request from "@utils/request";
import { toast } from "react-toastify";
import { authLogout } from "../authSlice";
import { clearTasks } from "@store/tasks/taskSlice";


type Tres = {
    message: string;
}
const actDeleteUser = createAsyncThunk('auth/actDeleteUser',
    async (_,thunk) => {
        const { rejectWithValue, getState, dispatch} = thunk
        const { auth : { user, token} } = getState() as RootState
        try {
            const res = await request.delete<Tres>(`/api/user/delete/${user?.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            toast.success(res.data.message)
            dispatch(authLogout())
            dispatch(clearTasks())

            
            return res.data;
        } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error))
        }
    }
)

export default actDeleteUser