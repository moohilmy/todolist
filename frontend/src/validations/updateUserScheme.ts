import { z } from "zod";

const updateUserScheme = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(5).email(),
  userName: z.string().min(2).max(50),
});

const updatedPasswordScheme = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .max(32, { message: "Password must be at least 32 characters long" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

type updateUserType = z.infer<typeof updateUserScheme>;
type updatePasswordType = z.infer<typeof updatedPasswordScheme>;

export {
  updateUserScheme,
  type updateUserType,
  type updatePasswordType,
  updatedPasswordScheme,
};
