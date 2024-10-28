import { Logo } from "@commponents/index";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationLogInShema, logInType } from "@validations/logInSchema";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { actGetAllTasks } from "@store/tasks/taskSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const { handleSubmit, register } = useForm<logInType>({
    resolver: zodResolver(validationLogInShema),
    mode: "onBlur",
  });
  const submitFrom: SubmitHandler<logInType> = async(data) => {
    await dispatch(actAuthLogin({ email: data.email, password: data.password }))
      .unwrap().then(()=>     dispatch(actGetAllTasks()))
  };

  useEffect(() => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
    }
    if(error) toast.error(error)
  }, [user, navigate,error]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"} className="mx-auto h-10 w-auto text-center">
            <Logo
              className="font-bold text-5xl sm:text-7xl text-darkblue"
              spanClass="inline-block text-purple-800"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
          <form onSubmit={handleSubmit(submitFrom)} className="space-y-6">
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address:
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="email"
                  autoComplete="username"
                  id="email"
                  {...register("email")}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password:
                </label>
                <div className="text-sm">
                  <Link
                    to="/user/email-check"
                    className="font-semibold text-darkblue hover:text-sky-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading === "pending" && true}
                className="flex w-full justify-center rounded-md bg-darkblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                {loading === "pending" ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/user/register"
              className="font-semibold leading-6 text-darkblue hover:text-sky-500"
            >
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
