import { Button, ButtonGroup, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import SearchIcon from "@mui/icons-material/Search";
import "./getCustomerById.css";
import globals from "../../../util/global";
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";

function GetCustomerById(): JSX.Element {
  const navigate = useNavigate();
  const [refCustomer, setCustomer] = useState<Customer>(new Customer());
  let [customerId, setId] = useState(0);

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

  const searchId = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setId(value as unknown as number);
  };
  return (
    <div className="getCustomerById" dir="ltr">
      <br />
      <br />
      <TextField
        name="id"
        label="Customer I.D. number"
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
      {<SingleCustomer customer={refCustomer} />}
    </div>
  );
}

export default GetCustomerById;
