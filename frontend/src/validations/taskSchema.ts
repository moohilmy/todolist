import { z  } from "zod";


const validationTaskShema = z.object({
    taskName: z.string().min(2),
    description: z.string().min(5),
}).required()

type taskType = z.infer<typeof validationTaskShema>

export { validationTaskShema, type taskType }