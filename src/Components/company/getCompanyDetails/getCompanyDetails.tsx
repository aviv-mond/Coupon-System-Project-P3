import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import "./getCompanyDetails.css";
import { Company } from "./../../../Models/Company";
import SingleCompany from "../singleCompany/singleCompany";

function GetCompanyDetails(): JSX.Element {
  const [companyDetails, setDetails] = useState<Company>(new Company());
  const navigate = useNavigate();

  useEffect(() => {
    jwtAxios
      .get<Company>(globals.urls.companyDetails)
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
    <div className="getCompanyDetails">
      <Typography variant="h4" align="center">
        Company #{companyDetails.id} Details
      </Typography>
      <hr />
      {<SingleCompany company={companyDetails} key="0" />}
    </div>
  );
}

export default GetCompanyDetails;
