import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import useCheckUsernameAvailability from "@hooks/useCheckUsernameAvailability";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpType, validationUserShema } from "@validations/signUpSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
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
  } = useForm<signUpType>({
    resolver: zodResolver(validationUserShema),
    mode: "onBlur",
  });
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

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
  const submitForm: SubmitHandler<signUpType> = async (data) => {
    if (
      emailAvailabilityStatus === "idle" ||
      usernameAvailabilityStatus === "idle"
    ) {
      checkUsernameAvailability(data.userName);
      checkEmailAvailability(data.email);

      return;
    }
    dispatch(
      actAuthRegister({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        userName: data.userName,
      })
    ).unwrap().then(() => {navigate('/user/login')})
  };
return {
  loading,
  error,
  errors,
  register,
  handleSubmit,
  onBlurHandlerEmail,
  onBlurHandlerUsername,
  submitForm,
  emailAvailabilityStatus,
  usernameAvailabilityStatus,
}
}

export default useRegister
