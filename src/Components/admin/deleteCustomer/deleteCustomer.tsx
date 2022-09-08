import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import { logoutUser } from "../../../redux/authState";
import DeleteIcon from "@mui/icons-material/Delete";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg, SccMsg } from "../../../util/notify";
import "./deleteCustomer.css";

function DeleteCustomer(): JSX.Element {
    const navigate = useNavigate();
    let [customerId, setId] = useState(0);

    const deleteCustomer = () => {
        jwtAxios
        .delete<Customer>(globals.urls.adminDeleteCustomer + customerId)
        .then(() => {
          notify.success(SccMsg.CUSTOMER_DELETED);
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
        <div className="deleteCustomer" dir="ltr">
			     <Typography variant="h4" align="center">
        Customer {customerId}
      </Typography>
      <hr />
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
        <Button color="warning" onClick={deleteCustomer} startIcon={<DeleteIcon />}>
            Delete Customer
          </Button>
      </ButtonGroup>
      <br />
      <br />
    </div>
  );
}


export default DeleteCustomer;
