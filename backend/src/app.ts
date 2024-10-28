import express,{Request,Response,NextFunction} from 'express';
import dotenv from 'dotenv';
import taskRouter from './router/taskRoute';
import authRouter from './router/authRoute';
import userRouter from './router/userRoute';
import passwordRouter from './router/passwordRoute';
import connectToDB from './config/connectToDB';
import XSS from 'xss';
import hpp from 'hpp';
import cors from 'cors'
import helmet from 'helmet';
dotenv.config();
connectToDB();


const app = express();
app.use(express.json())
app.use(helmet())
app.use(hpp())
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        req.body = Object.fromEntries(
            Object.entries(req.body).map(([key, value]) => [key, XSS(value as string)])
        )
    }
    next()
});
app.use(cors({
    origin: process.env.CLIENT_DOMAIN
}))

app.use('/api/tasks', taskRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/password', passwordRouter)


const PORT = process.env.PORT || 4080
app.listen(PORT, () => console.log(`localhost is listening on port ${PORT}`))