import { Logo, InputFeild } from "@commponents/index";
import { Link } from "react-router-dom";

import BackBtn from "@commponents/BackBtn/BackBtn";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    handleSubmit,
    submitForm,
    register,
    errors,
    emailAvailabilityStatus,
    onBlurHandlerEmail,
    onBlurHandlerUsername,
    usernameAvailabilityStatus,
    loading,
    error,
  } = useRegister();
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"} className="mx-auto  text-center">
            <Logo
              className="font-bold sm:text-7xl text-6xl text-darkblue"
              spanClass="inline-block text-purple-800"
            />
          </Link>
          <h2 className="sm:mt-10 mt-4 text-center sm:text-2xl text-xl font-bold leading-9 tracking-tight text-gray-900">
            create a new account
          </h2>
        </div>
        <div className="sm:grid-cols-8 sm:mt-10 grid grid-cols-1 gap-x-4 sm:gap-y-6 gap-y-4 mx-9">
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
          <InputFeild
            label="Password"
            register={register}
            name="password"
            type="password"
            error={errors?.password?.message}
            className="sm:col-span-6 sm:col-start-2"
          />
          <InputFeild
            label="Confirm Password"
            register={register}
            name="confirmPassword"
            type="password"
            error={errors?.confirmPassword?.message}
            className="sm:col-span-6 sm:col-start-2"
          />
          <button
            type="submit"
            disabled={
              loading === "pending"
                ? true
                : false || emailAvailabilityStatus === "notavailable"
                ? true
                : false
            }
            className="sm:col-start-2 sm:col-span-6 rounded-md bg-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {emailAvailabilityStatus === "notavailable"
              ? "username or email token"
              : loading === "pending"
              ? "Loading..."
              : "Submit"}
          </button>
          <BackBtn
            massage="Back to log in?"
            className=" sm:col-span-2 sm:col-start-4"
          />
        </div>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </form>
    </>
  );
};

export default Register;
