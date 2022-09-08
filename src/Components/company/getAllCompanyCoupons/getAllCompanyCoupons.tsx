import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import SingleCoupon from "../singleCoupon/singleCoupon";
import "./getAllCompanyCoupons.css";

function GetAllCompanyCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    jwtAxios
      .get<Coupon[]>(globals.urls.companyAllCoupon)
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
            notify.error(ErrMsg.NO_COMPANY_COUPONS);
        }
      });
  }, []);

  return (
    <div className="getAllCompanyCoupons">
      <Typography variant="h4" align="center">
        All company coupons
      </Typography>
      <hr />
      {coupons.map((item) => (
        <SingleCoupon coupon={item} key="0" />
      ))}
    </div>
  );
}

export default GetAllCompanyCoupons;
