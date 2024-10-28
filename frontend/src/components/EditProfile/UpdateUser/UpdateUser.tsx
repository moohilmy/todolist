import {
  updateUserScheme,
  updateUserType,
} from "@validations/updateUserScheme";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {actDeleteUser, actUpdateUser} from "@store/auth/authSlice";
import InputFeild from "@commponents/input/InputFeild";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import useCheckUsernameAvailability from "@hooks/useCheckUsernameAvailability";
const UpdateUser = ({ header }: { header: string }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();
  const {
    usernameAvailabilityStatus,
    enteredUsername,
    checkUsernameAvailability,
    resetCheckUsernameAvailability,
  } = useCheckUsernameAvailability();
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<updateUserType>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      userName: user?.userName,
    },
    resolver: zodResolver(updateUserScheme),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<updateUserType> = (data) => {
    dispatch(actUpdateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userName: data.userName,
    })).unwrap().then(() => {navigate(`/profile/${user?.id}`)})
  };
  const onBlurHandlerEmail = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  const onBlurHandlerUsername = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    await trigger("userName");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("userName");
    if (isDirty && !invalid && enteredUsername !== value) {
      // checking
      checkUsernameAvailability(value);
    }

    if (isDirty && invalid && enteredUsername) {
      resetCheckUsernameAvailability();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm sm:mt-10">
          <h2 className="sm:mt-10 mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {header}
          </h2>
        </div>
        <div className="sm:grid-cols-8 sm:mt-10 mt-6 grid grid-cols-1  gap-x-6 sm:gap-y-8 gap-y-4  mx-9">
          <InputFeild
            label="First name"
            register={register}
            name="firstName"
            error={errors?.firstName?.message}
          />
          <InputFeild
            label="Last name"
            register={register}
            name="lastName"
            error={errors?.lastName?.message}
            className="sm:col-span-3"
          />
          <InputFeild
            label="E-mail"
            register={register}
            type="email"
            name="email"
            error={
              errors?.email?.message
                ? errors?.email?.message
                : emailAvailabilityStatus === "notavailable"
                ? "this email is token"
                : ""
            }
            onBlur={onBlurHandlerEmail}
            formText={
              emailAvailabilityStatus === "checking"
                ? "we're currently checking the availabitay of this email address.. please wait a moment"
                : ""
            }
            success={
              emailAvailabilityStatus === "available"
                ? "email is available"
                : ""
            }
            disabled={emailAvailabilityStatus === "checking" ? true : false}
          />
          <InputFeild
            label="User Name"
            register={register}
            error={
              errors?.userName?.message
                ? errors?.userName?.message
                : usernameAvailabilityStatus === "notavailable"
                ? "this username is token"
                : ""
            }
            onBlur={onBlurHandlerUsername}
            name="userName"
            formText={
              usernameAvailabilityStatus === "checking"
                ? "we're currently checking the availabitay of this user name.. please wait a moment"
                : ""
            }
            success={
              usernameAvailabilityStatus === "available"
                ? "user name is available"
                : ""
            }
            disabled={usernameAvailabilityStatus === "checking" ? true : false}
            className="sm:col-span-3"
          />
          <button
            type="submit"
            className="sm:col-start-2 sm:col-span-6 rounded-md bg-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Submit
          </button>
          <Link
            to="edit-password"
            className="text-darkblue hover:text-blue-600 col-span-full text-center font-bold"
          >
            change password?
          </Link>
          <div className="sm:col-span-6 sm:col-start-2 col-span-full w-full flex justify-between mt-10">
            <motion.div
              whileHover={{
                scale: 1.05,
                opactiy: 0,
                backgroundColor: "#2563eb",
              }}
              className="cursor-pointer px-2 py-2 rounded bg-darkblue text-white"
            >
              Back to Tasks
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
                opactiy: 0,
                backgroundColor: "#f87171",
              }}
              onClick={() => dispatch(actDeleteUser()).unwrap().then(()=> {
                navigate('/')
                
              })}
              className="cursor-pointer px-2 py-2 rounded bg-red-600 text-white"
            >
              Delete account
            </motion.div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateUser;
