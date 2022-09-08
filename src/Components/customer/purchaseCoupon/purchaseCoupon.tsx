import { SyntheticEvent, useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import store from "../../../redux/store";
import "./purchaseCoupon.css";
import jwtAxios from "./../../../util/JwtAxios";
import globals from "./../../../util/global";
import notify, { ErrMsg, SccMsg } from "./../../../util/notify";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";
import SearchIcon from "@mui/icons-material/Search";
import { updateCoupon } from "../../../redux/couponState";
import { logoutUser } from "../../../redux/authState";
import { useNavigate } from "react-router-dom";

function PurchaseCoupon(): JSX.Element {
  let [coupons, setCoupons] = useState<Coupon[]>([]);
  let [purchCoupon, setPurchaseCoupon] = useState<Coupon>(new Coupon());
  let [couponId, setId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    store.subscribe(() => {
      setCoupons(store.getState().reducers.couponState.coupons);
    });
  });

  const getCoupon = () => {
    setPurchaseCoupon(
      coupons
        .filter((item) => {
          return item.id === couponId;
        })
        .shift()
    );
  };

  const sendPurchase = (msg: Coupon) => {
    jwtAxios
      .post<Coupon>(globals.urls.customerPurchaseCoupon, purchCoupon)
      .then((response) => {
        purchCoupon.amount = purchCoupon.amount - 1;
        store.dispatch(updateCoupon(purchCoupon));
        notify.success(SccMsg.PURCHASE_SUCCESS);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 400:
            notify.error(ErrMsg.PURCHASE_FAILED);
            navigate("/customer/purchaseCoupon")
            break;
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.COUPON_NOT_FOUND);
            navigate("/customer/purchaseCoupon");
            break;
        }
      });
  };

  const searchId = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setId(value as unknown as number);
  };

  return (
    <div className="purchaseCoupon">
      <>
        <Typography variant="h4" align="center">
          Purchase Coupon
        </Typography>
        <hr />
        <br />
        <TextField
          name="id"
          label="Coupon I.D. number"
          variant="outlined"
          className="TextBox"
          onChange={searchId}
          value={couponId}
        />
        <br />
        <br />
        <ButtonGroup variant="contained">
          <Button
            color="primary"
            onClick={getCoupon}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </ButtonGroup>
        <br />
        <br />
        {<SingleCoupon coupon={purchCoupon} />}
        <br />
        <br />
        <ButtonGroup variant="contained">
          <Button color="primary" onClick={sendPurchase}>
            Search
          </Button>
        </ButtonGroup>
        <hr />
        <br />
        {coupons.map((item) => (
          <SingleCoupon coupon={item} key="0" />
        ))}
      </>
    </div>
  );
}

export default PurchaseCoupon;
