import {IUserDocument} from '../schema/User'
export interface ITask extends Document{
    taskName: string
    description?: string
    completed: boolean
    userCreated?: IUserDocument['_id'] ;

}


