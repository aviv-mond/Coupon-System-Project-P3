import { Cancel } from "@mui/icons-material";
import { Typography, TextField, ButtonGroup, Button } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import SearchIcon from "@mui/icons-material/Search";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg, SccMsg } from "../../../util/notify";
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import "./updateCustomer.css";

function UpdateCustomer(): JSX.Element {
    const navigate = useNavigate();
  const [updateCustomer, setCustomer] = useState<Customer>(new Customer());
  let [customerId, setId] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>();

  const getCustomer = () => {
    jwtAxios
      .get<Customer>(globals.urls.adminCustomer + customerId)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.CUSTOMER_NOT_FOUND);
        }
      });
  };

  const sendUpdate = (msg: Customer) => {
    msg.id = updateCustomer.id;
    msg.password = updateCustomer.password;
    if (msg.firstName === "") {
      msg.firstName = updateCustomer.firstName;
    }
    if (msg.lastName === "") {
      msg.lastName = updateCustomer.lastName;
    }
    if (msg.email === "") {
      msg.email = updateCustomer.email;
    }
    jwtAxios
      .put<Customer>(globals.urls.adminUpdateCustomer, msg)
      .then((response) => {
        notify.success(SccMsg.CUSTOMER_UPDATED);
      })
      .catch((err) => {
        console.log(err);
        notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
      });
  };

  const searchId = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setId(value as unknown as number);
  };

    return (
        <div className="updateCustomer" dir="ltr">
			<>
        <Typography variant="h4" align="center">
          update Customer #{updateCustomer.id}
        </Typography>
        <hr />
        <br />
        <br />
        <TextField
          name="id"
          label=" Customer I.D. number"
          variant="outlined"
          className="TextBox"
          onChange={searchId}
          value={customerId}
        />
        <br />
        <br />
        <ButtonGroup variant="contained">
          <Button
            color="primary"
            onClick={getCustomer}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </ButtonGroup>
        <br />
        <br />
        {<SingleCustomer customer={updateCustomer} />}
        <br />
        <br />
        <form onSubmit={handleSubmit(sendUpdate)}>
          <TextField
            name="firstName"
            label="First name"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("firstName")}
          />
          <br />
          <br />
          <TextField
            name="lastName"
            label="Last name"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("lastName")}
          />
          <br />
          <br />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("email")}
          />
          <br />
          <br />
          <ButtonGroup variant="contained" fullWidth>
            <Button type="submit" color="primary">
              Send Update
            </Button>
            <Button type="reset" color="warning" startIcon={<Cancel />}>
              Clear
            </Button>
          </ButtonGroup>
        </form>
      </>
        </div>
    );
}

export default UpdateCustomer;
