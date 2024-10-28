import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Task, validateCreateTask, validateUpdateTask } from "../schema/Task";
/**
 * @desc Create a new Task
 * @route /api/tasks
 * @method POST
 * @access private (only logged in user)
 * */
export const createTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { error } = validateCreateTask(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const task = await Task.create({
      taskName: req.body.taskName,
      description: req?.body?.description,
      completed: false,
      userCreated: id,
    });
    res.status(201).json({ message: "Task created successfully", task });
  }
);

/**
 * @desc complete the task
 * @route /api/tasks/complete/:id
 * @method GET
 * @access private
 */

export const completeTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    task.completed = true;
    await task.save();
    res.json({
      message: "Task completed successfully"
    });
  }
);

/**
 * @desc Get all Tasks to user
 * @route /api/tasks
 * @method GET
 * @access privete
 **/
export const getAllTasksToUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const tasks = await Task.find({ userCreated: id }); // Find tasks created by this user
    res.status(200).json(tasks);
  }
);

/**
 * @desc Get a single Task by ID
 * @route /api/tasks/:taskId
 * @method GET
 * @access public
 **/

export const getTaskByIdCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    if (task.userCreated != req.params.id) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this task" });
      return;
    }
    res.json({
      _id: task._id,
      taskName: task.taskName,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userCreated: task.userCreated,
    });
  }
);

/**
 * @desc Update a Task by ID
 * @route /api/tasks/:taskid
 * @method PUT
 * */

export const updateTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { error } = validateUpdateTask(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: {
          taskName: req.body.taskName,
          description: req.body.description,
        },
      },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json({
      _id: task._id,
      taskName: task.taskName,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userCreated: task.userCreated,
    });
  }
);

/**
 * @desc Delete a Task by ID
 * @route /api/tasks/:taskId
 * @method DELETE
 **/

export const deleteTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    await task.remove();
    res.json({ message: "Task deleted successfully", taskId: task.id });
  }
);
