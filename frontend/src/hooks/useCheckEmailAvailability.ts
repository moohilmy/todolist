import { useState } from "react";
import request from "@utils/request";

type TStatus = "idle" | "checking" | "available" | "notavailable" | "failed";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");

  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const response = await request.get(`/api/user/check/email/${email}`);
      
      if (response.data.available) {
        setEmailAvailabilityStatus(response.data.message);
      } else {
        setEmailAvailabilityStatus(response.data.message);
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };
  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  };
  
  return {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};
export default useCheckEmailAvailability; 