import {
  PageSuspenseFallback,
  ProtectedRoute,
  LottieHandler,
} from "@commponents/index";
import Error from "@pages/Error";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const EditProfile = lazy(() => import("@pages/EditProfile"));
const CreateTask = lazy(() => import("@pages/CreateTask"));
const EmailCheck = lazy(() => import("@pages/EmailCheck"));
const VerifyPage = lazy(() => import("@pages/VerifyPage"));
const TasksContainer = lazy(() => import("@pages/TasksContainer"));
const TaskDetials = lazy(() => import("@pages/TaskDetials"));
const AuthLayout = lazy(() => import("@layout/AuthLayout/AuthLayout"));
const ProfileLayout = lazy(() => import("@layout/ProfileLayout/ProfileLayout"));
const PasswordControl = lazy(
  () => import("@commponents/EditProfile/PasswordControl/PasswordControl")
);
const UpdateUser = lazy(
  () => import("@commponents/EditProfile/UpdateUser/UpdateUser")
);


// );
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <LottieHandler type="loading" message="Loading please wait..." />
        }
      >
        <Home />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: "user",
    element: (
      <Suspense
        fallback={
          <LottieHandler type="loading" message="Loading please wait..." />
        }
      >
        <AuthLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "email-check",
        element: (
          <PageSuspenseFallback>
            <EmailCheck />
          </PageSuspenseFallback>
        ),
      },
      {
        path: ":id/forgot-password/token/:token",
        element: (
          <PageSuspenseFallback>
            <PasswordControl
              header="Forget password"
              massage="Back to Log in?"
              page="forgot-password"
            />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspenseFallback>
            <Register />
          </PageSuspenseFallback>
        ),
      },
      {
        path: ":userId/verify/:token",
        element: (
          <PageSuspenseFallback>
            <VerifyPage />
          </PageSuspenseFallback>
        ),
      },
    ],
  },
  {
    path: "profile/:id",
    element: (
      <ProtectedRoute>
        <Suspense
          fallback={
            <LottieHandler type="loading" message="Loading please wait..." />
          }
        >
          <ProfileLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
            <PageSuspenseFallback>
              <TasksContainer />
            </PageSuspenseFallback>
        ),
      },
      {
        path: "task/:taskId",
        element: <TaskDetials />,
      },
      {
        path: "create-task",
        element: (
          <PageSuspenseFallback>
            <CreateTask />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "edit-profile",
        element: (
          <PageSuspenseFallback>
            <EditProfile />
          </PageSuspenseFallback>
        ),
        children: [
          { index: true, element: <UpdateUser header="Update your profile" /> },
          {
            path: "edit-password",
            element: <PasswordControl header="Change password" />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />

      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
