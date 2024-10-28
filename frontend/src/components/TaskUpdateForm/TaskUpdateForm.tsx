import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskType, validationTaskShema } from "@validations/taskSchema";
import { TTask } from "@types";
import { useAppDispatch } from "@store/hooks";
import { actUpdateTask } from "@store/tasks/taskSlice";
import { useNavigate, useParams } from "react-router";
const TaskUpdateForm = ({ taskState }: { taskState: TTask }) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<taskType>({
    resolver: zodResolver(validationTaskShema),
    mode: "onBlur",
  });
  const navigate = useNavigate()
  useEffect(() => {
    reset({
      taskName: taskState?.taskName,
      description: taskState?.description,
    });
  }, [taskState, reset]);
  
  const dispath = useAppDispatch()
  const {id} = useParams()
  const onSubmit: SubmitHandler<taskType> = (data) => {
    dispath(actUpdateTask(data)).unwrap().then(() => navigate(`/profile/${id}`))
  };
  return (
    <div>
      <h2 className="text-4xl font-bold my-3">Edit Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          <div className="flex justify-between">
            <label htmlFor="taskName" className="mb-1 block text-sm font-medium text-gray-900">
              Task Name:
            </label>
            <span className="text-xs text-red-500">
              {errors?.taskName?.message}
            </span>
          </div>
          <input
            {...register("taskName")}
            id="taskName"
            type="text"
            placeholder="Task Title"
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
          />
        </div>
        <div className="mt-5">
          <div className="flex justify-between">
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-900">
              Task Description:
            </label>
            <span className="text-xs text-red-500">
              {errors?.description?.message}
            </span>
          </div>
          <textarea
            {...register("description")}
            id="description"
            placeholder="Task Description"
            rows={3}
            className="tracking-wider px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-5 w-full rounded-md bg-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskUpdateForm;
