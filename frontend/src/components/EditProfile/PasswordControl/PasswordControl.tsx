import BackBtn from "@commponents/BackBtn/BackBtn";
import InputFeild from "@commponents/input/InputFeild";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  actCheckResetLinkPassword,
  actResetPassword,
  actUpdatePassword,
} from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import {
  updatedPasswordScheme,
  updatePasswordType,
} from "@validations/updateUserScheme";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
const PasswordControl = ({
  header,
  massage = "Back to edit profile?",
  page = "edit-page",
}: {
  header: string;
  massage?: string;
  page?: string;
}) => {
  const { id, token } = useParams();
  const isMountedRef = useRef<boolean>(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<updatePasswordType>({
    resolver: zodResolver(updatedPasswordScheme),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<updatePasswordType> = (data) => {
    if (page === "edit-page") {
      dispatch(actUpdatePassword(data.password));
    }
    if (page === "forgot-password") {
      dispatch(
        actResetPassword({
          password: data.password,
          id: id as string,
          token: token as string,
        })
      )
        .unwrap()
        .then(() => navigate("/user/login"));
    }
  };
  useEffect(() => {
    if (page === "forgot-password" && isMountedRef.current) {
      dispatch(
        actCheckResetLinkPassword({ id: id as string, token: token as string })
      );
      return;
    }
  }, [page, dispatch]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {header}
          </h2>
        </div>
        <div className="grid lg:grid-cols-5">
          <div className=" lg:col-span-3 lg:col-start-2 sm:grid-cols-8 mt-10 grid grid-cols-1 gap-x-6 gap-y-8  mx-9">
            <InputFeild
              label="Password"
              type="password"
              register={register}
              name="password"
              error={errors?.password?.message}
              className="sm:col-span-6 sm:col-start-2"
            />
            <InputFeild
              label="Confirm Password"
              register={register}
              type="password"
              name="confirmPassword"
              error={errors?.confirmPassword?.message}
              className="sm:col-span-6 sm:col-start-2"
            />
            <button
              type="submit"
              disabled={loading === "pending" ? true : false}
              className="sm:col-start-2 sm:col-span-6 rounded-md bg-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {loading === "pending" ? "loading" : "Submit"}
            </button>
            <BackBtn
              massage={massage}
              className={"col-span-full text-center"}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default PasswordControl;
