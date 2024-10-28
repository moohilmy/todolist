import {motion} from 'framer-motion' 
import { useAppSelector } from "@store/hooks";

interface Ibtn {
  btnContaxt : string,
  className : string,
  click?: (id: number) => void
 
}
const TaskBtn = ({btnContaxt , className, click}: Ibtn) => {
  const { loading } = useAppSelector((state) => state.tasks);

  return (
    <motion.button
    onClick={click}
    disabled={loading === 'pending' ? true : false}
    className={`relative z-10 py-3 px-5 ${className} rounded text-xs text-lime-50`}
  >
    {btnContaxt}
  </motion.button>
  )
}

export default TaskBtn
