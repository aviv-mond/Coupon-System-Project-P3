import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import SingleCustomer from "../singleCustomer/singleCustomer";
import "./getCustomerDetails.css";

function GetCustomerDetails(): JSX.Element {
  const [customerDetails, setDetails] = useState<Customer>(new Customer());
  const navigate = useNavigate();

  useEffect(() => {
    jwtAxios
      .get<Customer>(globals.urls.customerDetails)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => {
        notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
        store.dispatch(logoutUser());
        navigate("/login");
      });
  }, []);

  return (
    <div className="getCustomerDetails">
      <Typography variant="h4" align="center">
        Customer #{customerDetails.id} Details
      </Typography>
      <hr />
      {<SingleCustomer customer={customerDetails} key="0" />}
    </div>
  );
}

export default GetCustomerDetails;
