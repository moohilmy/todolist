import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import { User, validateEmail, validateNewPassword } from "../schema/User";
import sendEmail from "../utils/sendEmail";
import { Request, Response } from "express";
import {
  createVarifictionToken,
  VerifictionToken,
} from "../schema/VerificationToken";


/**
 * @desc Update your password
 * @router /api/password/update-password
 * @method PUT
 * @access protected
 */

export const updatePasswordCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { error } = validateNewPassword(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "Password updated successfully log in with new password" });
  }
);

/**
 * @desc send Reset Password Lind
 * @router /api/password/reset-password
 * @method POST
 * @access PublicAPI
 */

export const sendPasswordLinkCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { error } = validateEmail(req.body);
    
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    let verificationToken = await VerifictionToken.findOne({
      userId: user._id,
    });
    if(verificationToken){
      res.status(400).json({ message: "You have already requested a password reset" });
      return
    }
    if (!verificationToken) {
      verificationToken = new VerifictionToken({
        userId: user._id,
        token: createVarifictionToken(),
      });
      await verificationToken.save();
    }
    const resetLink = `${process.env.CLIENT_DOMAIN}/user/${user._id}/forgot-password/token/${verificationToken.token}`;
    const htmlTeplate = `<a href=${resetLink}>click here to reset your password</a>`;
    await sendEmail(user.email, "reset password", htmlTeplate);
    res
      .status(200)
      .json({ message: "Reset password link has been sent, check your email" });
  }
);
/**
 * @desc Get Restet password link
 * @router /api/password/rest-password/:id/token/:token
 * @method GET 
 * @access Private
 */

export const getResetPasswordLink = asyncHandler(async(req: Request, res: Response)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400).json({message: "invalid Link"})
        return
    }
    const verificationToken = await VerifictionToken.findOne({
        userId: user._id,
        token: req.params.token
    })
    if(!verificationToken)
    {
        res.status(401).json({message: "Invalid Token"})
        return
    }
    res.status(200).json({message:"valid url"})
})


/**
 * @desc Post a new password
 * @route /api/password/reset-password/:id/:token
 * @method POST
 * @access protected
 * 
 */

export const resetPasswordCtrl = asyncHandler(async(req: Request, res: Response)=>{
    const {error} = validateNewPassword(req.body)
    if(error)
    {
        res.status(400).json({message: error.details[0].message})
        return
    }
    const user = await User.findById(req.params.id)
    if(!user)
    {
        res.status(404).json({message: "invalid Link"})
        return
    }
    const verificationToken = await VerifictionToken.findOne({
        userId: user._id,
        token: req.params.token
    })
    if(!verificationToken)
    {
        res.status(400).json({message: "invalid Link"})
        return
    }
    if(!user.isVerified)
    {
        user.isVerified = true
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    user.password = hashedPassword
    await user.save()
    await verificationToken.remove()
    res.status(200).json({ message: 'password reset succesfully please log in' })
})

