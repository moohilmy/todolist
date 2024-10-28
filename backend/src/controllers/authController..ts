import bcrypt from "bcrypt";
import {
  User,
  validateRegistUser,
  validateLoginUser,
  CreateToken,
} from "../schema/User";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  VerifictionToken,
  createVarifictionToken,
} from "../schema/VerificationToken";
import sendEmail from "../utils/sendEmail";

/**
 * @desc Register New User - Sign-UP
 * @route /api/auth/register
 * @method POST
 * @access public
 */
export const registerUserCtrl = asyncHandler(
  async (req: Request, res: Response) => {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const { error } = validateRegistUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    const verifictionToken = new VerifictionToken({
      userId: user._id,
      token: createVarifictionToken(),
    });
    await verifictionToken.save();
    const link = `${process.env.CLIENT_DOMAIN}/user/${user._id}/verify/${verifictionToken.token}`

    const htmlTemplate =`
    <div>
        <p>Click on the link below to verify your email</p>
        <a href="${link}">verify</a>
    </div>
    `
    await sendEmail(user.email,'verify Your Email',htmlTemplate)
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  }
);

/**
 * @desc Login User - Sign-IN
 * @route /api/auth/login
 * @method POST
 * @access public
 * */

export const loginUserCtrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    if (!user.isVerified) {
      let verificationToken = await VerifictionToken.findOne({userId: user._id})
      if(verificationToken)
      {
        res.status(400).json({message: "Please check your email address"})
        return;
      }
      verificationToken = new VerifictionToken({
        userId: user._id,
        token: createVarifictionToken(),
      });
      await verificationToken.save();
      const link = `${process.env.CLIENT_DOMAIN}/user/${user._id}/verify/${verificationToken.token}`;
      const htmlTemplate = `
        <div>
            <p>Click on the link below to verify your email</p>
            <a href="${link}">verify</a>
        </div>
        `;
      await sendEmail(user.email, "verify Your Email", htmlTemplate);
      res.status(400).json({
        message: "We sent to you an email,please verify your email address",
      });
      return;
    }
    const id: string = user._id.toString();
    const token = CreateToken(id);
    res.json({
      user: {
        id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
      },
      token
    });
  }
);

export const verifyUserAccountCtrl = asyncHandler(async(req:Request, res:Response)=>{
  const user = await User.findById(req.params.id)
  console.log('worj');
  
  if(!user){
    res.status(400).json({message: "User not found"})
    return
  }
  const verificationToken = await VerifictionToken.findOne({
    userId: user._id,
    token: req.params.token
  })
  if(!verificationToken){
    res.status(400).json({message: "Invalid Link"})
    return
  }
  user.isVerified = true
  await user.save()
  await verificationToken.remove()
  res.status(200).json({message: "your account verified"})
})