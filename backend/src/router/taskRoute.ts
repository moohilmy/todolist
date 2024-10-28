import express from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  getTaskByIdCtrl,
  getAllTasksToUser,
  completeTask,
} from "../controllers/taskController"; // Ensure these functions are correctly exported
import { validateObjectId } from "../middleware/validateObjectId"; // Importing the validateObjectId middleware
import {verifyToken} from "../middleware/verifyToken";

const taskRouter = express.Router();

// Define the routes for task management
taskRouter
  .post("/user/:id",validateObjectId,verifyToken,createTask) // Create a new task
  .get("/user/:id",validateObjectId, verifyToken, getAllTasksToUser) // Get all tasks to user
  .delete("/task/delete/:id", validateObjectId, deleteTask) // Delete a specific task by taskId
  .put("/task/update/:taskId", validateObjectId,verifyToken, updateTask) // Update a specific task by taskId
  .get("/task/complete/:id", validateObjectId, verifyToken, completeTask) // Update a specific task by taskId

taskRouter.route('/user/:id/task/:taskId').get(validateObjectId,verifyToken,getTaskByIdCtrl)
export default taskRouter; // Export the router
