import { useNavigate, useParams } from "react-router";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetTaskById } from "@store/tasks/taskSlice";
import { TaskBtnDetials, TaskUpdateForm } from "@commponents/index";
import useDeleteHandler from "@hooks/useDeleteHandler";

const TaskDetials = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);
  const isMountedRef = useRef<boolean>(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMountedRef.current && task?._id?.toString() != taskId) {
      dispatch(actGetTaskById(taskId as string));
    }
  }, [dispatch, taskId]);
  const { deleteTask } = useDeleteHandler();
  const createTime = new Date(task.createdAt);
  const updateTime = new Date(task.updatedAt);
  const ConvertTime = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };
  return (
    <div className=" grid grid-cols-12 sm:mt-10 my-6">
      <div className=" col-span-10 col-start-2 ">
        <div className="space-y-1 pb-3 border-b-2">
          <p className="font-bold ">
            Task name:{" "}
            <span className="inline-block text-slate-800 font-light">
              {task.taskName}
            </span>
          </p>
          <p className="font-bold ">
            Create in:{" "}
            <span className="inline-block text-slate-800 font-light">
              {`${createTime.getDate()}/${createTime.getMonth()}/${createTime.getFullYear()}`}
            </span>
            <span className="inline-block text-slate-800 font-light">
              {ConvertTime(createTime)}
            </span>
          </p>
          <p className="font-bold ">
            Last edit:{" "}
            <span className="inline-block text-slate-800 font-light pr-8">
              {`${updateTime.getDate()}/${updateTime.getMonth()}/${updateTime.getFullYear()}`}
            </span>
            <span className="inline-block text-slate-800 font-light">
              {ConvertTime(updateTime)}
            </span>
          </p>
          <div>
            <span className="inline-block font-bold">Description:</span>
            <div className=" italic">{task.description}</div>
          </div>
        </div>
        <TaskUpdateForm taskState={task} />
        <div className="sm:col-span-6 sm:col-start-2 col-span-full w-full flex justify-between mt-10">
          <TaskBtnDetials
            task={"Back to Tasks"}
            bg={"#d1d5db"}
            bgHover={"bg-gray-500"}
            click={() => navigate(`/profile/${user?.id}`)}
          />
          <TaskBtnDetials
            task={"Done Task"}
            bg={"#86efac"}
            bgHover={"bg-green-600"}
            click={() => navigate(`/profile/${user?.id}`)}
          />
          <TaskBtnDetials
            task={"Delete Task"}
            bg={"#f87171"}
            bgHover={"bg-red-600"}
            click={() => deleteTask(task._id).unwrap().then(()=> navigate(`/profile/${user?.id}`))}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetials;
