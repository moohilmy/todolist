import { User, validateUpdateUser } from "../schema/User";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Task } from "../schema/Task";
import {
  createVarifictionToken,
  VerifictionToken,
} from "../schema/VerificationToken";
import sendEmail from "../utils/sendEmail";

/**
 * @desc checks if the email or username is available
 * @router /api/users/check/:?email/:?username
 * @method GET
 * @access public
 */

export const checkEmailAvailability = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.json({ message: "notavailable", available: false })
      return;
    }
    res.json({ message: "available", available: true });
  }
);

export const checkuserNameAvailability = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findOne({ userName : req.params.username});
    if (user) {
      res.json({ message: "notavailable", available: false })
      return;
    }
    res.json({ message: "available", available: true });
  }
);

/**
 * @desc Updates the user
 * @route /api/user/:id
 * @method PUT
 * @access Private
 **/

export const upadteUserCtrl = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if (user.email !== req.body.email) {
      user.isVerified = false;
      let verifictionToken = await VerifictionToken.create({
        userId: user._id,
        token: createVarifictionToken(),
      });
      await verifictionToken.save();
      const link = `http://localhost:5173/verify/${user._id}/token/${verifictionToken.token}`;
      const htmlTemplate = `
        <div>
            <h2>Verify your email</h2>
            <p>To complete your registration, please verify your email by clicking the following link:</p>
            <a href=${link}>${link}</a>
            </div>`;
      await user.save();
      await sendEmail(user.email, "Verify Your Email", htmlTemplate);
    }

    const userUpdate = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName ? req.body.firstName : user.firstName,
          lastName: req.body.lastName ? req.body.lastName : user.lastName,
          userName: req.body.userName ? req.body.userName : user.userName,
          email: req.body.email ? req.body.email : user.email,
        },
      },
      { new: true }
    );
    if (!userUpdate) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({
        user:{
          id: userUpdate._id,
          userName: userUpdate.userName,
          firstName: userUpdate.firstName,
          lastName: userUpdate.lastName,
          email: userUpdate.email,
          isVerified: userUpdate.isVerified,
        },
        message: "user successfully updated , if change email check your email",
      });
  }
);

/**
 * @desc Delete a USER by ID
 * @route /api/user/:id
 * @method DELETE
 **/

export const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const tasks = await Task.find({ userCreated: user._id });
    tasks?.forEach(async (task) => {
      await task.remove();
    });

    await user.remove();
    res.json({messsage: 'users deleted'})
  }
);
