import { useAppDispatch } from "@store/hooks"
import { actCompleteTask } from "@store/tasks/taskSlice"

const useCompleteHandler = () => {
    
  const dispatch = useAppDispatch()
  const completeTask = (id: number) => dispatch(actCompleteTask(id))
  return {completeTask}
}

export default useCompleteHandler
