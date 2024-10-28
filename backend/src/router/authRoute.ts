import express from "express";
import { registerUserCtrl,loginUserCtrl, verifyUserAccountCtrl } from "../controllers/authController.";

const authRouter = express.Router();

authRouter
.post("/register", registerUserCtrl);

authRouter
.post("/login", loginUserCtrl);

authRouter.get('/verify/:id/token/:token', verifyUserAccountCtrl)

export default authRouter;