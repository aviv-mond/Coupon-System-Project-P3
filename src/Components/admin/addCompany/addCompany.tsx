import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import "./addCompany.css";
import { Cancel } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../Models/Company";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { SccMsg, ErrMsg } from "../../../util/notify";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>();

  const addCompany = (msg: Company) => {
    jwtAxios
      .post<Company>(globals.urls.adminAddCompany, msg)
      .then((response) => {
        notify.success(SccMsg.COMPANY_ADDED);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.COMPANY_ADD_ERROR_EXISTS);
        }
      });
  };

  return (
    <div className="addCompany" dir="ltr">
      <Typography variant="h4" align="center">
        Add Company
      </Typography>
      <hr />
      <br />
      <br />
      <form onSubmit={handleSubmit(addCompany)}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("name", {
            required: {
              value: true,
              message: "* missing company name",
            },
          })}
        />
        <br />
        {errors.name && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.name.message}
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
            ADD COMPANY
          </Button>
          <Button type="reset" color="warning" startIcon={<Cancel />}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default AddCompany;
