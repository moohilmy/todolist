import { actVerifyAccount } from "@store/auth/authSlice";
import { useAppDispatch } from "@store/hooks";
import { Link, useParams } from "react-router-dom";

const verifyPage = () => {
  const dispatch = useAppDispatch();
  const { userId, token } = useParams();

  return(
    <div className=" flex flex-col items-center justify-center">
      <div className="text-4xl text-center">Verify Your Email</div>
      <div className="text-gray-600 text-center mt-4">
        click to botton below to verify your email
      </div>
      <Link
        to={'/user/login'}
        onClick={() =>
          dispatch(
            actVerifyAccount({ id: userId as string, token: token as string })
          )
        }
        className="mt-8 bg-purple-800 hover:bg-purple-900 text-white text-center px-8 py-4 rounded-md"
      >
        verify Email
      </Link>
    </div>
  );
};

export default verifyPage;
