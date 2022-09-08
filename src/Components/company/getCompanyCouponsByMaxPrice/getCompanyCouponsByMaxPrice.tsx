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
import SingleCoupon from "../singleCoupon/singleCoupon";
import "./getCompanyCouponsByMaxPrice.css";

function GetCompanyCouponsByMaxPrice(): JSX.Element {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  let [couponMaxPrice, setPrice] = useState(0);

  const getMaxPrice = () => {
    jwtAxios
      .get<Coupon[]>(globals.urls.companyCouponPrice + couponMaxPrice)
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.NO_COUPONS_PRICE);
        }
      });
  };

  const searchPrice = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setPrice(value as unknown as number);
  };

  return (
    <div className="getCompanyCouponsByMaxPrice" dir="ltr">
      <br />
      <br />
      <TextField
        name="Price"
        label="Coupon max Price"
        variant="outlined"
        className="TextBox"
        onChange={searchPrice}
        value={couponMaxPrice}
      />
      <br />
      <br />
      <ButtonGroup variant="contained">
        <Button
        color= "primary"
        onClick={getMaxPrice}
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

export default GetCompanyCouponsByMaxPrice;
