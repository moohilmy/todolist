import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token} = useAppSelector((state) => state.auth);
  const navigate = useNavigate()
  useEffect(() => {
    
    if (!token) {
      toast.error("you have access please log in");
      navigate("/user/login");
    }
  }, [token]);

  return <>{children}</>;
};

export default ProtectedRoute;