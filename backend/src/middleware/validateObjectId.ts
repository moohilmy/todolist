import mongoose from "mongoose";
import { Response,Request, NextFunction } from "express";

const validateObjectId = (req:Request,res:Response,next:NextFunction): void => {
    if(req.params.id){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Invalid ID" });
            return
        }
    }
    if(req.params.taskId){
        if(!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            res.status(400).json({ message: "Invalid ID" });
            return
        }
    }
    next();
}

export  {validateObjectId};