import express from "express";
import { upadteUserCtrl , deleteUser, checkEmailAvailability, checkuserNameAvailability} from "../controllers/userController";
import { validateObjectId } from "../middleware/validateObjectId";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = express.Router();

userRouter
.put("/update/:id",validateObjectId,verifyToken, upadteUserCtrl)
.delete('/delete/:id',validateObjectId,verifyToken, deleteUser)
.get('/check/email/:email',checkEmailAvailability)
.get('/check/username/:username',checkuserNameAvailability)


export default userRouter;