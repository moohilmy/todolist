import { isAxiosError } from 'axios'
import { toast } from 'react-toastify';

const AxiosErrorHandler = (error: unknown)=>{
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || error.message);
      } else {
        return "An unexpected error";
      }
}

export default AxiosErrorHandler;