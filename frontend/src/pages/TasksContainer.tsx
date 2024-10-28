import { TaskList } from "@commponents/index";

const TasksContainer = () => {

  return (
    <div className="space-y-8 pb-10">
    <div className="grid content-center my-10 grid-cols-4">
          <h2 className="col-span-full col-start-2 text-2xl mb-3">Task List</h2>
    </div>
    <TaskList />
    </div>
  );
};

export default TasksContainer;
