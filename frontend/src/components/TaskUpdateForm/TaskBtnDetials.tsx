import { motion } from "framer-motion";


const TaskBtnDetials = ({task, bg, bgHover, click }: {task: string; bg: string; bgHover: string; click: (id?: number | string) => void }) => {
  return (
    <motion.div
    whileHover={{
      scale: 1.05,
      opactiy: 0,
      backgroundColor: bg,
      color: "#000000",
    }}
    onClick={click}
    className={`cursor-pointer px-2 py-2 rounded ${bgHover} text-white`}
  >
    {task}
  </motion.div>
  )
}

export default TaskBtnDetials
