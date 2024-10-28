import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actCreateTask } from "@store/tasks/taskSlice";
import { taskType, validationTaskShema } from "@validations/taskSchema";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<taskType>({
    resolver: zodResolver(validationTaskShema),
    mode: "onBlur",
  });
  const {error , loading } = useAppSelector(state => state.tasks)  
  const { user } = useAppSelector(state => state.auth)  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<taskType> = (data) => {
    dispatch(actCreateTask({
      taskName: data.taskName,
      description: data.description
    })).unwrap().then(()=> navigate(`/profile/${user?.id}`));
  };
    useCallback(()=>{
      if(error) toast.error(error)
    },[error])
  return (
    <>
      <div className="grid grid-cols-12 space-y-12 my-12">
        <div className="info text-center  col-span-full">
          <h1 className="text-5xl font-bold mb-4">Hallo, first name</h1>
          <h2 className="text-purple-800 font-bold text-3xl">
            Create a new Task
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" col-span-6 col-start-4"
        >
          <div className="mt-5">
            <div className="flex justify-between">
              <label
                htmlFor="taskName"
                className={`mb-1 block text-sm font-medium leading-6  text-gray-900`}
              >
                Task Name:
              </label>
              <span className="text-xs text-red-500">
                {errors?.taskName?.message}
              </span>
            </div>
            <input
              id="taskName"
              type="text"
              {...register('taskName')}
              placeholder="Task Title"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-5">
            <div className="flex justify-between">
            <label
              htmlFor="description"
              className={`mb-1 block text-sm font-medium leading-6  text-gray-900`}
            >
              Task Description:
            </label>
            <span className="text-xs text-red-500">
              {errors?.description?.message}
            </span>
            </div>
            <textarea
              {...register('description')}
              id="description"
              placeholder="Task Description"
              rows={3}
              className="tracking-wider px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading === 'pending' ? true : false}
            className="mt-5 w-full rounded-md bg-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {loading === 'pending' ? "loading" : "Save a new task"}
          </button>
        </form>
        {/* Tasks List */}
      </div>
    </>
  );
};

export default CreateTask;
