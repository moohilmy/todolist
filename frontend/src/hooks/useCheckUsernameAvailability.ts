import { useState } from "react";
import request from "@utils/request";

type TStatus = "idle" | "checking" | "available" | "notavailable" | "failed";

const useCheckEmailAvailability = () => {
  const [usernameAvailabilityStatus, setUsernameAvailabilityStatus] =
    useState<TStatus>("idle");

  const [enteredUsername, setEnteredUsername] = useState<null | string>(null);

  const checkUsernameAvailability = async (username: string) => {
    setEnteredUsername(username);
    setUsernameAvailabilityStatus("checking");
    try {
      const response = await request.get(`/api/user/check/username/${username}`);
      
      if (response.data.available) {
        setUsernameAvailabilityStatus(response.data.message);
      } else {
        setUsernameAvailabilityStatus(response.data.message);
      }
    } catch (error) {
      setUsernameAvailabilityStatus("failed");
    }
  };
  const resetCheckUsernameAvailability = () => {
    setUsernameAvailabilityStatus("idle");
    setEnteredUsername(null);
  };
  
  return {
    usernameAvailabilityStatus,
    enteredUsername,
    checkUsernameAvailability,
    resetCheckUsernameAvailability,
  };
};
export default useCheckEmailAvailability; 