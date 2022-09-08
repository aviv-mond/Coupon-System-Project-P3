import { Typography, TextField, ButtonGroup, Button } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { logoutUser } from "../../../redux/authState";
import DeleteIcon from "@mui/icons-material/Delete";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { ErrMsg, SccMsg } from "../../../util/notify";
import { deleteCoupon } from "../../../redux/couponState";
import "./deleteCoupon.css";

function DeleteCoupon(): JSX.Element {
  const navigate = useNavigate();
  let [couponId, setId] = useState(0);

  const delCoupon = () => {
    jwtAxios
      .delete<Coupon>(globals.urls.companyDeleteCoupon + couponId)
      .then((response) => {
        store.dispatch(deleteCoupon(couponId));
        notify.success(SccMsg.COUPON_DELETED);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.COUPON_NOT_FOUND);
        }
      });
  };

  const searchId = (args: SyntheticEvent) => {
    let value = (args.target as HTMLInputElement).value;
    setId(value as unknown as number);
  };

  return (
    <div className="deleteCoupon" dir="ltr">
      <Typography variant="h4" align="center">
        Coupon {couponId}
      </Typography>
      <hr />
      <br />
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
          color="warning"
          onClick={delCoupon}
          startIcon={<DeleteIcon />}
        >
          Delete Coupon
        </Button>
      </ButtonGroup>
      <br />
      <br />
    </div>
  );
}

export default DeleteCoupon;
