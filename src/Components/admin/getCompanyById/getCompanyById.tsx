import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Company } from "../../../Models/Company";
import "./getCompanyById.css";
import jwtAxios from "../../../util/JwtAxios";
import globals from "../../../util/global";
import SingleCompany from "../../company/singleCompany/singleCompany";
import SearchIcon from "@mui/icons-material/Search";
import store from "../../../redux/store";
import { logoutUser } from "../../../redux/authState";
import notify, { ErrMsg } from "../../../util/notify";
import { useNavigate } from "react-router-dom";

function GetCompanyById(): JSX.Element {
  const navigate = useNavigate();
  const [refCompany, setCompany] = useState<Company>(new Company());
  let [companyId, setId] = useState(0);

  const getCompany = () => {
    jwtAxios
      .get<Company>(globals.urls.adminCompany + companyId)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.COMPANY_NOT_FOUND);              
        }
      });
  };

  const searchId = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setId(value as unknown as number);
  };
  return (
    <div className="getCompanyById" dir="ltr">
      <Typography variant="h4" align="center">
        Company #{refCompany.id}
      </Typography>
      <hr />
      <br />
      <br />
      <TextField
        name="id"
        label="Company I.D. number"
        variant="outlined"
        className="TextBox"
        onChange={searchId}
        value={companyId}
      />
      <br />
      <br />
      <ButtonGroup variant="contained">
        <Button color="primary" onClick={getCompany} startIcon={<SearchIcon />}>
          Search
        </Button>
      </ButtonGroup>
      <br />
      <br />
      {<SingleCompany company={refCompany} />}
    </div>
  );
}

export default GetCompanyById;
