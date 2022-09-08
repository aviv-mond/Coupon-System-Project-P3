import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./pageHeader.css";
import { NavLink } from "react-router-dom";
import store from "../../../redux/store";
import { useEffect, useState } from "react";
import { logoutUser } from './../../../redux/authState';

function PageHeader(): JSX.Element {
  const [isLogged, setLogged] = useState(false);
  
  const loginLink = () => {
    return (
      <>
        <Typography variant="h6" className="login">
          <NavLink to="login">Login</NavLink>
        </Typography>
      </>
    );
  };

  const logoutLink = () => {
    return (
      <>
        <Typography variant="h6" className="login">
          <NavLink to="/" onClick={logStatusOut}>Logout</NavLink>
        </Typography>
      </>
    );
  };

  const logStatusOut = () => {
    store.dispatch(logoutUser());
  }

  useEffect(() => {
    store.subscribe(() => {
      setLogged(store.getState().reducers.authState.isLogged);
    });
  });

  return (
    <div className="pageHeader" dir="ltr">
      <>
        <Typography variant="h3" className="Headline" display="inline">
          Coupon System{" "}<NavLink to="/"><HomeIcon /></NavLink>
        </Typography>
        {store.getState().reducers.authState.isLogged ? logoutLink() : loginLink()}
      </>
    </div>
  );
}

export default PageHeader;
