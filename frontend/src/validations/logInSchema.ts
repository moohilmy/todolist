import { z  } from "zod";


const validationLogInShema =  z.object({
    email: z.string().min(5).email(),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .max(32, { message: "Password must be at least 32 characters long"})
}).required()

type logInType = z.infer<typeof validationLogInShema>

export {validationLogInShema, type logInType}