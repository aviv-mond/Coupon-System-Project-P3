import { Button, ButtonGroup, Typography } from "@mui/material";
import { Customer } from "../../../Models/Customer";
import "./singleCustomer.css";

interface SingleCustomerProps {
	customer: Customer
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {
    return (
        <div className="singleCustomer Box">
			<Typography variant="h2">{props.customer.id}</Typography><hr/><br/>
            {props.customer.firstName}<br/><br/>
            {props.customer.lastName}<br/><br/>
            {props.customer.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
               <Button color="primary">Coupon List</Button> 
            </ButtonGroup>
        </div>
    );
}

export default SingleCustomer;