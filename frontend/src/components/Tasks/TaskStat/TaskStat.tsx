import { motion } from "framer-motion";
type Tprops = {
    label : string;
    count : number;
    onClick? : () => void;
}
const TaskStat = ({ label, count , onClick}: Tprops) => {
  return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-200 p-3 rounded-lg cursor-pointer sm:text-[20px]"
          onClick={onClick}
        >
          <h2 className="font-bold mb-3">{label}</h2>
          <span className="block text-slate-400 text-3xl">{count}</span>
        </motion.div>
      
  )
}

export default TaskStat
