import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./loginScreen.css";
import LoginDetails from "../../../Models/LoginDetails";
import { Cancel, Login } from "@mui/icons-material";
import notify, { ErrMsg, SccMsg } from "../../../util/notify";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/authState";
import store from "../../../redux/store";

function LoginScreen(): JSX.Element {
  const {register, handleSubmit, formState: { errors }} = useForm<LoginDetails>();
  const navigate = useNavigate();

  const sendLogin = (msg: LoginDetails) => {
    jwtAxios
      .post<LoginDetails>(globals.urls.login, msg)
      .then((response) => {
        store.dispatch(loginUser(msg.userType));
        notify.success(SccMsg.LOGIN_SUCCESS);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        notify.error(ErrMsg.LOGIN_ERROR);
      });
  };

  return (
    <div className="loginScreen Box" dir="ltr">
      <Typography variant="h4" className="Headline">
        Login
      </Typography>{" "}
      <hr />
      <br />
      <form onSubmit={handleSubmit(sendLogin)}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("email", {
            required: {
              value: true,
              message: "* missing email address",
            },
          })}
        />
        <br />
        {errors.email && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.email.message}
          </Typography>
        )}
        <br />

        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("password", {
            required: {
              value: true,
              message: "* missing password",
            },
          })}
        />
        <br />
        {errors.password && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.password.message}
          </Typography>
        )}
        <br />

        <TextField
          name="userType"
          label="User type"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("userType", {
            required: {
              value: true,
              message: "* missing user type",
            },
          })}
        />
        <br />
        {errors.userType && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.userType.message}
          </Typography>
        )}

        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary" startIcon={<Login />}>
            Login
          </Button>
          <Button type="reset" color="warning" startIcon={<Cancel />}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default LoginScreen;
