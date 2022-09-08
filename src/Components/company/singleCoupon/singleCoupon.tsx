import { Button, ButtonGroup, Typography } from "@mui/material";
import { Coupon } from "../../../Models/Coupon";
import { useNavigate } from 'react-router-dom';

interface SingleCouponProps {
  coupon: Coupon;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {    
  return (
    <div className="singleCoupon Box">
      <Typography variant="h2">{props.coupon.id}</Typography>
      <hr /><br />
      amount = {props.coupon.amount} 
      <br /><br />
      price = {props.coupon.price}
      <br /><br />
      category = {props.coupon.category} 
      <br /><br />
      title = {props.coupon.title}
      <br /><br />
      description = {props.coupon.description}
      <br /><br />
      image = {props.coupon.image}
      <br /><br />
      startDate = {props.coupon.startDate}
      <br /><br />
      endDate = {props.coupon.endDate}
      <br /><br />
    </div>
  );
}

export default SingleCoupon;
