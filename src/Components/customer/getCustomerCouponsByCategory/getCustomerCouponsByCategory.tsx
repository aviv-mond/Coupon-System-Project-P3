import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import SearchIcon from "@mui/icons-material/Search";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";
import "./getCustomerCouponsByCategory.css";

function GetCustomerCouponsByCategory(): JSX.Element {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  let [couponCategory, setCategory] = useState("");

  const getCategory = () => {
    jwtAxios
      .get<Coupon[]>(globals.urls.customerCouponCategory + couponCategory)
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.NO_COUPONS_CATEGORY);
        }
      });
  };

  const searchCategory = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setCategory(value as unknown as string);
  };

  return (
    <div className="getCustomerCouponsByCategory" dir="ltr">
      <br />
      <br />
      <TextField
        name="Category"
        label="Coupon category"
        variant="outlined"
        className="TextBox"
        onChange={searchCategory}
        value={couponCategory}
      />
      <br />
      <br />
      <ButtonGroup variant="contained">
        <Button
          color="primary"
          onClick={getCategory}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <Typography variant="h4" align="center">
        All coupons
      </Typography>
      <hr />
      {coupons.map((item) => (
        <SingleCoupon coupon={item} key="0" />
      ))}
    </div>
  );
}

export default GetCustomerCouponsByCategory;
