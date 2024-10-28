import mongoose , {Document , Schema} from "mongoose";
import { ITask } from "../types/taskType";
import Joi from "joi";
// Connect to MongoDB

interface ITaskDocument extends ITask, Document {
  createdAt: any;
  updatedAt: any;
}
const taskSchema: Schema  = new Schema({
    
    taskName: {type: String, required: true},
    description: {type: String},
    completed: {type: Boolean, default: false},
    userCreated:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User",
        required: true,
    }
},{
    
    timestamps: true,
    versionKey: false,
})


const validateCreateTask = (obj:ITask) =>{
    const schema = Joi.object({
        taskName: Joi.string().min(2).required().trim(),
        description: Joi.string().min(5).trim(),
        completed: Joi.boolean()
    })
    return schema.validate(obj);
}
const validateUpdateTask = (obj:ITask) =>{
    const schema = Joi.object({
        taskName: Joi.string().min(2).trim(),
        description: Joi.string().min(5).trim(),
        completed: Joi.boolean()
    })
    return schema.validate(obj);
}

const Task = mongoose.model<ITaskDocument>("Task", taskSchema);
export {Task, validateCreateTask , validateUpdateTask,ITaskDocument};