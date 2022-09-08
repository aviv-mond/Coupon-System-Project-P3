import { Cancel } from "@mui/icons-material";
import { Typography, TextField, ButtonGroup, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { SccMsg, ErrMsg } from "../../../util/notify";
import "./addCustomer.css";

function AddCustomer(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>();

  const addCustomer = (msg: Customer) => {
    jwtAxios
      .post<Customer>(globals.urls.adminAddCustomer, msg)
      .then((response) => {
        notify.success(SccMsg.CUSTOMER_ADDED);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.CUSTOMER_ADD_ERROR_EXISTS);
        }
      });
  };

  return (
    <div className="addCustomer" dir="ltr">
      <Typography variant="h4" align="center">
        Add Customer
      </Typography>
      <hr />
      <br />
      <br />
      <form onSubmit={handleSubmit(addCustomer)}>
        <TextField
          name="firstName"
          label="First name"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("firstName", {
            required: {
              value: true,
              message: "* missing customer first name",
            },
          })}
        />
        <br />
        {errors.firstName && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.firstName.message}
          </Typography>
        )}
        <br />
        <TextField
          name="lastName"
          label="Last name"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("lastName", {
            required: {
              value: true,
              message: "* missing customer last name",
            },
          })}
        />
        <br />
        {errors.lastName && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.lastName.message}
          </Typography>
        )}
        <br />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("email", {
            required: {
              value: true,
              message: "* missing email",
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
          name="password"
          label="Password"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("password", {
            required: {
              value: true,
              message: "*missing Password",
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
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">
            ADD CUSTOMER
          </Button>
          <Button type="reset" color="warning" startIcon={<Cancel />}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default AddCustomer;
