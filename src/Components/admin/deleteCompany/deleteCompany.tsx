import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../Models/Company";
import DeleteIcon from "@mui/icons-material/Delete";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import "./deleteCompany.css";

function DeleteCompany(): JSX.Element {
  const navigate = useNavigate();
  let [companyId, setId] = useState(0);

  const deleteCompany = () => {
    jwtAxios
      .delete<Company>(globals.urls.adminDeleteCompany + companyId)
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
    <div className="deleteCompany" dir="ltr">
      <Typography variant="h4" align="center">
        Company {companyId}
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
        <Button color="warning" onClick={deleteCompany} startIcon={<DeleteIcon />}>
            Delete Company
          </Button>
      </ButtonGroup>
      <br />
      <br />
    </div>
  );
}

export default DeleteCompany;
