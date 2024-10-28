import { motion, Reorder, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TaskBtn from "../TaskBtn/TaskBtn";
import { useAppSelector } from "@store/hooks";
import { TTaks } from "@types";
import { Link } from "react-router-dom";
import useDeleteHandler from "@hooks/useDeleteHandler";
import useCompleteHandler from "@hooks/useCompleteHandler";

const TaskItem = ({ tasks }: { tasks: TTaks[] }) => {
  const [items, setItems] = useState<TTaks[]>(tasks);
  const { error } = useAppSelector((state) => state.tasks);
  const navigate = useNavigate();
  useEffect(() => {
    setItems(tasks);
  }, [tasks]);

  const { deleteTask } = useDeleteHandler();
  const { completeTask } = useCompleteHandler();
  return error ? (
    <div className="space-y-2 h-60 sm:col-span-4 sm:col-start-2 col-span-12 overflow-hidden flex flex-col items-center justify-evenly p-4">
      <p className="text-center text-4xl text-red-600">
        Something went wrong: {error}
      </p>
    </div>
  ) : items.length === 0 ? (
    <div className="space-y-2 h-60 sm:col-span-6 sm:col-start-3 col-span-12 overflow-hidden flex flex-col items-center justify-evenly p-4">
      <p className="text-center text-4xl text-gray-600">
        Good job! You finished all tasks ^-^.
      </p>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link to="create-task" className="p-3 bg-darkblue rounded text-white">
          Go to create new task
        </Link>
      </motion.div>
    </div>
  ) : (
    <AnimatePresence>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="space-y-2 sm:col-span-6 sm:col-start-3 col-span-12 overflow-hidden p-4"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item._id}
            value={item}
            as={motion.div}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, zIndex: 9 }}
            exit={{ opacity: 0, x: -500 }}
            whileHover={{ scale: 1.05, zIndex: 9 }}
            whileTap={{ scale: 0.95, zIndex: 9 }}
            className={  `flex justify-between items-center ${item.completed ? 'bg-green-200' : 'bg-gray-200'} p-4 rounded-lg shadow-md cursor-pointer col-start-2 sm:col-span-2 sm:col-start-2 col-span-6`}
          >
            <div>
              <h2
                className="text-xl p-2 hover:underline underline-offset-4"
                onClick={() => navigate(`task/${item._id}`)}
              >
                {item.taskName}
              </h2>
            </div>
            <div className="space-x-2">
              {!item.completed && (
                <TaskBtn
                  className="bg-green-500"
                  btnContaxt="done"
                  click={() => {
                    completeTask(item?._id);
                  }}
                />
              )}
              <TaskBtn
                className="bg-gray-500"
                btnContaxt="edit"
                click={() => navigate(`task/${item._id}`)}
              />
              <TaskBtn
                click={() => deleteTask(item?._id)}
                className="bg-red-500"
                btnContaxt="delete"
              />
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </AnimatePresence>
  );
};

export default TaskItem;
