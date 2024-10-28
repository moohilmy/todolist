import { z  } from "zod";


const validationUserShema =  z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    userName: z.string().min(2).max(50),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .max(32, { message: "Password must be at least 32 characters long"})
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) 
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
    confirmPassword: z.string().min(8, { message: "Confirm Password is required" }),
    email: z.string().min(5).email()
}).required().refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],})

type signUpType = z.infer<typeof validationUserShema>

export {validationUserShema, type signUpType}