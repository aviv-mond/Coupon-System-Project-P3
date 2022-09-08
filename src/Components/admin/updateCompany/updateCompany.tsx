import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import "./updateCompany.css";
import { Company } from "./../../../Models/Company";
import { useForm } from "react-hook-form";
import store from "../../../redux/store";
import notify, { ErrMsg, SccMsg } from "../../../util/notify";
import jwtAxios from "../../../util/JwtAxios";
import globals from "../../../util/global";
import { Cancel } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/authState";
import SingleCompany from "../../company/singleCompany/singleCompany";

function UpdateCompany(): JSX.Element {
  const navigate = useNavigate();
  const [updateCompany, setCompany] = useState<Company>(new Company());
  let [companyId, setId] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>();

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

  const sendUpdate = (msg: Company) => {
    msg.id = updateCompany.id;
    msg.password = updateCompany.password;
    msg.coupons = updateCompany.coupons;
    if (msg.name === "") {
      msg.name = updateCompany.name;
    }
    if (msg.email === "") {
      msg.name = updateCompany.email;
    }
    jwtAxios
      .put<Company>(globals.urls.adminUpdateCompany, msg)
      .then((response) => {
        notify.success(SccMsg.COMPANY_UPDATED);
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
    <div className="updateCompany" dir="ltr">
      <>
        <Typography variant="h4" align="center">
          Update Company #{updateCompany.id}
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
          <Button
            color="primary"
            onClick={getCompany}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </ButtonGroup>
        <br />
        <br />
        {<SingleCompany company={updateCompany} />}
        <br />
        <br />
        <form onSubmit={handleSubmit(sendUpdate)}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("name")}
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

export default UpdateCompany;
