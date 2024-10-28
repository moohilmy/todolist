import BackBtn from "@commponents/BackBtn/BackBtn";
import InputFeild from "@commponents/input/InputFeild";
import { zodResolver } from "@hookform/resolvers/zod";
import { actResetLinkPassword } from "@store/auth/authSlice";
import { useAppDispatch } from "@store/hooks";
import { useForm ,SubmitHandler} from "react-hook-form";
import { z } from "zod";

const validatEmail = z.object({
  email: z.string().min(5).email(),
});
type emailType = z.infer<typeof validatEmail>
const EmailCheck = () => {
  const dispatch = useAppDispatch()
  const {handleSubmit,register} = useForm<emailType>({
    resolver: zodResolver(validatEmail),
    mode: 'onBlur'
  })
  const onSubmit: SubmitHandler<emailType> = (data) => {
    dispatch(actResetLinkPassword(data.email))
  };
  return (
    <div className="grid sm:grid-cols-4 md:grid-cols-8 grid-cols-6">
      <form
        className="col-start-2 sm:col-start-2 md:col-start-2 sm:col-span-2 md:col-span-6 col-span-4  space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFeild
          type="email"
          label="E-mail"
          register={register}
          name="email"
          
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-darkblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Submit
        </button>
      </form>
      <BackBtn
        massage={"Back to log in?"}
        className={
          "col-start-2 sm:col-start-2 md:col-start-2 sm:col-span-2 md:col-span-6 col-span-4  text-center mt-5"
        }
      />
    </div>
  );
};

export default EmailCheck;
