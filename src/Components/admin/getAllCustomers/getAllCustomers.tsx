import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import "./getAllCustomers.css";

function GetAllCustomers(): JSX.Element {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        jwtAxios
        .get<Customer[]>(globals.urls.adminAllCustomer)
        .then((response) => {
            setCustomers(response.data);
        })
        .catch((err) => {
            switch (err.response.status) {
                case 401:
                    notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED)
                    store.dispatch(logoutUser());
                    navigate("/login");
                    break;
                    case 404:
                    notify.error(ErrMsg.NO_CUSTOMERS_EXIST);
            }
        });
    },[]);

    return (
        <div className="getAllCustomers">
            <Typography variant="h4" align="center">
                All Customers
			</Typography>
            <hr/>
            {customers.map((item) => (
             <SingleCustomer customer={item} key="0" />   
            ))}
        </div>
    );
}

export default GetAllCustomers;
