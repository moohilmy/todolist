import { actDeleteTask } from "@store/tasks/taskSlice";
import { useAppDispatch } from "@store/hooks";

const useDeleteHandler = () => {
    const dispatch = useAppDispatch()
    const deleteTask = (id: number)=> dispatch(actDeleteTask(id))
  return {deleteTask}
}

export default useDeleteHandler
