import { Cancel } from "@mui/icons-material";
import { Typography, TextField, ButtonGroup, Button } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { SccMsg, ErrMsg } from "../../../util/notify";
import SingleCoupon from "../singleCoupon/singleCoupon";
import SearchIcon from "@mui/icons-material/Search";
import "./updateCoupon.css";
import { updateCoupon } from "../../../redux/couponState";
import store from "../../../redux/store";

function UpdateCoupon(): JSX.Element {
  let [coupons, setCoupons] = useState<Coupon[]>([]);
  let [updCoupon, setUpdateCoupon] = useState<Coupon>(new Coupon());
  let [couponId, setId] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Coupon>();

  useEffect(() => {
    store.subscribe(() => {
      setCoupons(store.getState().reducers.couponState.coupons);
    });
  });

  const getCoupon = () => {
    setUpdateCoupon(
      coupons
        .filter((item) => {
          return item.id === couponId;
        })
        .shift()
    );
  };

  const sendUpdate = (msg: Coupon) => {
    msg.id = updCoupon.id;
    if (msg.amount === 0) {
      msg.amount = updCoupon.amount;
    }
    if (msg.price === 0) {
      msg.price = updCoupon.price;
    }
    if (msg.category === "") {
      msg.category = updCoupon.category;
    }
    if (msg.title === "") {
      msg.title = updCoupon.title;
    }
    if (msg.description === "") {
      msg.description = updCoupon.description;
    }
    if (msg.image === "") {
      msg.image = updCoupon.image;
    }
    if (msg.startDate === "") {
      msg.startDate = updCoupon.startDate;
    }
    if (msg.endDate === "") {
      msg.endDate = updCoupon.endDate;
    }
    jwtAxios
      .put<Coupon>(globals.urls.companyUpdateCoupon, msg)
      .then((response) => {
        store.dispatch(updateCoupon(msg));
        notify.success(SccMsg.COUPON_UPDATED);
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
    <div className="updateCoupon" dir="ltr">
      <>
        <Typography variant="h4" align="center">
          Update Coupon #{updCoupon.id}
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
            color="primary"
            onClick={getCoupon}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </ButtonGroup>
        <br />
        <br />
        {<SingleCoupon coupon={updCoupon} />}
        <br />
        <br />
        <form onSubmit={handleSubmit(sendUpdate)}>
          <TextField
            name="amount"
            label="Amount"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("amount")}
          />
          <br />
          <br />
          <TextField
            name="price"
            label="Price"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("price")}
          />
          <br />
          <br />
          <TextField
            name="category"
            label="Category"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("category")}
          />
          <br />
          <br />
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("title")}
          />
          <br />
          <br />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("description")}
          />
          <br />
          <br />
          <TextField
            name="image"
            label="Image"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("image")}
          />
          <br />
          <br />
          <TextField
            name="startDate"
            label="Start date"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("startDate")}
          />
          <br />
          <br />
          <TextField
            name="endDate"
            label="End date"
            variant="outlined"
            className="TextBox"
            fullWidth
            {...register("endDate")}
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

export default UpdateCoupon;
