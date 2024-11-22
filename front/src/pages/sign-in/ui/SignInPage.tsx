import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../shared/model";
import { TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";

import { userLogin } from "../../../shared/model";
import s from "./SignInPage.module.scss";
import validator from "validator";

interface ISubmitValues {
  email: string;
  password: string;
}

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const isSignInFail = useAppSelector((state) => state.user.isSignInFail);
  const navigate = useNavigate();
  const error_default = {
    width: "fit-content",
    backgroundColor: "transparent",
    p: 0,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ISubmitValues> = (data) => {
    dispatch(userLogin(data));
  };
  if (!isAuth) {
    return (
      <div className={s.SignInPage}>
        <div className={s.content}>
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <Controller
              render={({ field }) => (
                <TextField
                  label="email"
                  variant="outlined"
                  type={"email"}
                  {...field}
                />
              )}
              name="email"
              control={control}
              rules={{
                required: "This field is required!",
                pattern: {
                  value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                  message: "Invalid email!",
                },
              }}
            />
            <div className={s.error_list}>
              {errors?.email?.type === "required" && (
                <Alert severity="error" sx={error_default}>
                  {errors.email.message}
                </Alert>
              )}
              {errors?.email?.type === "pattern" && (
                <Alert severity="error" sx={error_default}>
                  {errors.email.message}
                </Alert>
              )}
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="password"
                  variant="outlined"
                  type={"password"}
                  {...field}
                />
              )}
              rules={{
                required: "This field is required!",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 symbols!",
                },
                validate: {
                  isStrong: (value) => {
                    return (
                      validator.isStrongPassword(value, {
                        minUppercase: 1,
                        minLowercase: 1,
                        minNumbers: 1,
                        minSymbols: 1,
                      }) ||
                      "Password must contain capital and small letters, special symbols and numbers!"
                    );
                  },
                },
              }}
            />
            <div className={s.error_list}>
              {errors?.password?.message && (
                <Alert sx={error_default} severity="error">
                  {errors.password.message}
                </Alert>
              )}
              {isSignInFail && (
                <Alert sx={error_default} severity="error">
                  Failed to sign in
                </Alert>
              )}
            </div>
            <div className={s.submit_bar}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                loadingIndicator="Loading…"
              >
                Sign In
              </LoadingButton>
              <Link to={"/sign-up"}>Don't have an account? Sign Up!</Link>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate(-1);
    return <div></div>;
  }
};

export default SignInPage;
