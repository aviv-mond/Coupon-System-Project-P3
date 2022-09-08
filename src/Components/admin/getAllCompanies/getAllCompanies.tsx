import { Typography } from "@mui/material";
import "./getAllCompanies.css";
import { useState, useEffect } from "react";
import SingleCompany from "../../company/singleCompany/singleCompany";
import jwtAxios from "../../../util/JwtAxios";
import globals from "../../../util/global";
import notify, { ErrMsg } from "../../../util/notify";
import { useNavigate } from "react-router-dom";
import { Company } from "./../../../Models/Company";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";

function GetAllCompanies(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
     jwtAxios
       .get<Company[]>(globals.urls.adminAllCompany)
       .then((response) => {
         setCompanies(response.data);
       })
       .catch((err) => {
         switch (err.response.status) {
           case 401:
             notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
             store.dispatch(logoutUser());
             navigate("/login");
             break;
           case 404:
             notify.error(ErrMsg.NO_COMPANIES_EXIST);              
         }
       });
   }, []);

  return (
    <div className="getAllCompanies">
      <Typography variant="h4" align="center">
        All Companies
      </Typography>
      <hr />
      {companies.map((item) => (
        <SingleCompany company={item} key="0" />
      ))}
    </div>
  );
}

export default GetAllCompanies;
