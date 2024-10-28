import { useEffect, useMemo, useRef, useState } from "react";
import TaskItem from "../Taskitems/TaskItem";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetAllTasks, resetUI } from "@store/tasks/taskSlice";
import TaskStat from "../TaskStat/TaskStat";
import { TTask } from "@types";
interface TaskListProps {
  isInList?: boolean; // Optional prop with default value
}
type Taskaction = "alltasks" | "completed" | "notCompleted";
const TaskList = ({ isInList = true }: TaskListProps) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);
  const [taskState, setTaskState] = useState<TTask[]>(tasks);
  const [taskAction, setTaskAcion] = useState<Taskaction>("alltasks");
  const isMountedRef = useRef<boolean>(true);
  const prevTasksLengthRef = useRef<number>(tasks.length);
  useEffect(() => {
    return () => {
      dispatch(resetUI());
      isMountedRef.current = false;
      prevTasksLengthRef.current = tasks.length;
    };
  }, []);

  useEffect(() => {
    if (isMountedRef && prevTasksLengthRef.current !== tasks.length) {
      dispatch(actGetAllTasks());
    }
  }, [dispatch]);
  const taskCounts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const notCompleted = total - completed;
    return { total, completed, notCompleted };
  }, [tasks]);
  useEffect(() => {
    if (taskAction === "completed")
      return setTaskState(tasks.filter((item) => item.completed));
    if (taskAction === "notCompleted")
      return setTaskState(tasks.filter((item) => !item.completed));
    setTaskState(tasks);
  }, [taskAction, tasks]);

  return (
    <>
      {isInList && (
        <div className="gap-5 flex flex-row justify-center flex-wrap">
          <TaskStat
            onClick={() => setTaskAcion("alltasks")}
            label="ALL Tasks:"
            count={taskCounts.total}
          />
          <TaskStat
            onClick={() => setTaskAcion("notCompleted")}
            label="Task not Complete:"
            count={taskCounts.notCompleted}
          />
          <TaskStat
            onClick={() => setTaskAcion("completed")}
            label="Task complete:"
            count={taskCounts.completed}
          />
        </div>
      )}

      <div className="grid sm:grid-cols-10 grid-cols-12">
        <TaskItem tasks={taskState} />
      </div>
    </>
  );
};

export default TaskList;
