import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TTaks, TTask, isString } from "@types";
import actCreateTask from "./act/actCreateTask";
import actGetAllTasks from "./act/actGetAllTasks";
import actDeleteTask from "./act/actDeleteTask";
import actGetTaskById from "./act/actGetTaskById";
import actUpdateTask from "./act/actUpdateTask";
import actCompleteTask from "./act/actCompleteTask";
type TTaskState = {
  tasks: TTaks[];
  loading: TLoading;
  error: string | null;
  task: TTask;
};
const initialState: TTaskState = {
  tasks: [],
  loading: "idle",
  error: null,
  task: {
    _id: 0,
    taskName: "",
    description: "",
    userCreated: 0,
    createdAt: "",
    updatedAt: "",
    completed: false,
  },
};
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    completeTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((item) => item._id === taskId);
      if (task) {
        task.completed = true;
      }
    },
    updateTasks : (state, action) =>{
      const task = state.tasks.find((item : TTask) => item._id === action.payload._id)
      if (task) {
        task.taskName = action.payload.taskName;
        task.description = action.payload.description;
        task.updatedAt = action.payload.updatedAt;
      }
    },
    clearTasks: (state)=>{
      state.tasks = [];

    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(actCreateTask.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actCreateTask.fulfilled, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        } else {
          state.loading = "succeeded";
          state.tasks = [...state.tasks, action.payload];
        }
      })
      .addCase(actCreateTask.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
          state.loading = "failed";
        }
      });

    builder
      .addCase(actGetAllTasks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actGetAllTasks.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.tasks = action.payload;
        }
        state.loading = "succeeded";
      })
      .addCase(actGetAllTasks.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        state.loading = "failed";
      });

    builder
      .addCase(actDeleteTask.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actDeleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.loading = "succeeded";
      })
      .addCase(actDeleteTask.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        state.loading = "failed";
      });

    builder
      .addCase(actGetTaskById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actGetTaskById.fulfilled, (state, action) => {
        state.task = action.payload as TTask;
        state.loading = "succeeded";
      })
      .addCase(actGetTaskById.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        state.loading = "failed";
      });

    builder
      .addCase(actUpdateTask.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actUpdateTask.fulfilled, (state, action) => {
        state.task = action.payload as TTask;
        state.loading = "succeeded";
      })
      .addCase(actUpdateTask.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        state.loading = "failed";
      });

    builder
      .addCase(actCompleteTask.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(actCompleteTask.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actCompleteTask.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        state.loading = "failed";
      });
  },
});

export const { resetUI, completeTask ,updateTasks,clearTasks} = taskSlice.actions;
export default taskSlice.reducer;
export {
  actCreateTask,
  actGetAllTasks,
  actDeleteTask,
  actGetTaskById,
  actUpdateTask,
  actCompleteTask,
};
