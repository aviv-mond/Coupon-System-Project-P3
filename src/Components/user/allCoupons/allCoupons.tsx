import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import { downloadCoupons } from "../../../redux/couponState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg } from "../../../util/notify";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";
import "./allCoupons.css";

function AllCoupons(): JSX.Element {
  let [coupons, setCoupons] = useState<Coupon[]>([]);
  useEffect(() => {
    jwtAxios
      .get<Coupon[]>(globals.urls.allCoupons)
      .then((response) => {
        store.dispatch(downloadCoupons(response.data));
      })
      .catch((err) => {
        notify.error(ErrMsg.GENERAL_ERROR);
        console.error(err);
      });
    store.subscribe(() => {
      setCoupons(store.getState().reducers.couponState.coupons);
    });
  }, []);

  return (
    <div className="allCoupons">
      <hr />
      {coupons.map((item) => (
        <SingleCoupon coupon={item} key="0" />
      ))}
    </div>
  );
}

export default AllCoupons;
