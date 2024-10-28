import { sendPasswordLinkCtrl , getResetPasswordLink , resetPasswordCtrl, updatePasswordCtrl } from  "../controllers/passwordController"
import express from "express";
import { validateObjectId } from "../middleware/validateObjectId";
import {verifyToken} from "../middleware/verifyToken";
const passwordRouter = express.Router();

passwordRouter.post('/reset-password', sendPasswordLinkCtrl)


passwordRouter.route("/reset-password/:id/token/:token").get(getResetPasswordLink).post(resetPasswordCtrl)

passwordRouter.put('/update-password/:id',validateObjectId,verifyToken, updatePasswordCtrl)

export default passwordRouter