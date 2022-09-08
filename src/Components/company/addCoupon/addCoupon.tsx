import { Cancel } from "@mui/icons-material";
import { Typography, TextField, ButtonGroup, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { logoutUser } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JwtAxios";
import notify, { SccMsg, ErrMsg } from "../../../util/notify";
import { addCoupon } from "../../../redux/couponState";
import "./addCoupon.css";

function AddCoupon(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Coupon>();

  const createCoupon = (msg: Coupon) => {
    jwtAxios
      .post<Coupon>(globals.urls.companyAddCoupon, msg)
      .then((response) => {
        store.dispatch(addCoupon(msg));
        notify.success(SccMsg.COUPON_ADDED);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notify.error(ErrMsg.LOGIN_AUTHORIZATION_NEEDED);
            store.dispatch(logoutUser());
            navigate("/login");
            break;
          case 404:
            notify.error(ErrMsg.COUPON_ADD_ERROR_EXISTS);
        }
      });
  };
  return (
    <div className="addCoupon" dir="ltr">
      <Typography variant="h4" align="center">
        Add Coupon
      </Typography>
      <hr />
      <br />
      <br />
      <form onSubmit={handleSubmit(createCoupon)}>
        <TextField
          name="amount"
          label="Amount"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("amount", {
            required: {
              value: true,
              message: "* missing coupon amount",
            },
          })}
        />
        <br />
        {errors.amount && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.amount.message}
          </Typography>
        )}
        <br />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("price", {
            required: {
              value: true,
              message: "* missing coupon price",
            },
          })}
        />
        <br />
        {errors.price && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.price.message}
          </Typography>
        )}
        <br />
        <TextField
          name="category"
          label="Category"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("category", {
            required: {
              value: true,
              message: "* missing coupon category",
            },
          })}
        />
        <br />
        {errors.category && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.category.message}
          </Typography>
        )}
        <br />
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("title", {
            required: {
              value: true,
              message: "* missing coupon title",
            },
          })}
        />
        <br />
        {errors.title && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.title.message}
          </Typography>
        )}
        <br />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("description", {
            required: {
              value: true,
              message: "* missing coupon description",
            },
          })}
        />
        <br />
        {errors.description && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.description.message}
          </Typography>
        )}
        <br />
        <TextField
          name="image"
          label="Image"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("image", {
            required: {
              value: true,
              message: "* missing coupon image",
            },
          })}
        />
        <br />
        {errors.image && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.image.message}
          </Typography>
        )}
        <br />
        <TextField
          name="startDate"
          label="Start date"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("startDate", {
            required: {
              value: true,
              message: "* missing coupon start date",
            },
          })}
        />
        <br />
        {errors.startDate && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.startDate.message}
          </Typography>
        )}
        <br />
        <TextField
          name="endDate"
          label="End date"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("endDate", {
            required: {
              value: true,
              message: "* missing coupon end date",
            },
          })}
        />
        <br />
        {errors.startDate && (
          <Typography variant="subtitle2" className="errorMsg">
            {errors.endDate.message}
          </Typography>
        )}
        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">
            ADD COUPON
          </Button>
          <Button type="reset" color="warning" startIcon={<Cancel />}>
            Clear
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default AddCoupon;
