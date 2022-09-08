import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../redux/store";
import "./pageMenu.css";

function PageMenu(): JSX.Element {
  const [userType, setType] = useState("GUEST");
  const adminMenu = () => {
    return (
      <>
        <Typography variant="subtitle1">Administrator:</Typography>
        <ul className="AdminPaths">
          <Typography variant="subtitle2">
            <li>
              <NavLink to="admin/addCompany">Add company</NavLink>
            </li>
            <li>
              <NavLink to="admin/getCompanyById">Find company</NavLink>
            </li>
            <li>
              <NavLink to="admin/getAllCompanies">All companies</NavLink>
            </li>
            <li>
              <NavLink to="admin/updateCompany">Update company</NavLink>
            </li>
            <li>
              <NavLink to="admin/deleteCompany">Delete company</NavLink>
            </li>
            <li>
              <NavLink to="admin/addCustomer">Add customer</NavLink>
            </li>
            <li>
              <NavLink to="admin/getCustomerById">Find customer</NavLink>
            </li>
            <li>
              <NavLink to="admin/getAllCustomers">All customers</NavLink>
            </li>
            <li>
              <NavLink to="admin/updateCustomer">Update customer</NavLink>
            </li>
            <li>
              <NavLink to="admin/deleteCustomer">Delete customer</NavLink>
            </li>
          </Typography>
        </ul>
      </>
    );
  };

  const companyMenu = () => {
    return (
      <>
        <Typography variant="subtitle1">Compoany:</Typography>
        <ul className="CompanyPaths">
          <Typography variant="subtitle2">
            <li>
              <NavLink to="company/addCoupon">Add coupon</NavLink>
            </li>
            <li>
              <NavLink to="company/getAllCompanyCoupons">All coupons</NavLink>
            </li>
            <li>
              <NavLink to="company/getCompanyCouponsByCategory">
                Coupons by category
              </NavLink>
            </li>
            <li>
              <NavLink to="company/getCompanyCouponsByMaxPrice">
                Coupons by upper price
              </NavLink>
            </li>
            <li>
              <NavLink to="company/updateCoupon">Update coupon</NavLink>
            </li>
            <li>
              <NavLink to="company/deleteCoupon">Delete coupon</NavLink>
            </li>
            <li>
              <NavLink to="company/getCompanyDetails">Company details</NavLink>
            </li>
          </Typography>
        </ul>
      </>
    );
  };

  const customerMenu = () => {
    return (
      <>
        <Typography variant="subtitle1">Customer:</Typography>
        <ul className="CustomerPaths">
          <Typography variant="subtitle2">
            <li>
              <NavLink to="customer/purchaseCoupon">Purchase coupon</NavLink>
            </li>
            <li>
              <NavLink to="customer/getAllCustomerCoupons">All coupons</NavLink>
            </li>
            <li>
              <NavLink to="customer/getCustomerCouponsByCategory">
                Coupons by category
              </NavLink>
            </li>
            <li>
              <NavLink to="customer/getCustomerCouponsByMaxPrice">
                Coupons by upper price
              </NavLink>
            </li>
            <li>
              <NavLink to="customer/getCustomerDetails">
                Customer details
              </NavLink>
            </li>
          </Typography>
        </ul>
      </>
    );
  };

  useEffect(() => {
    store.subscribe(() => {
      setType(store.getState().reducers.authState.userType);
    });
  });

  return (
    <div className="pageMenu" dir="ltr">
      <>
        {store.getState().reducers.authState.userType == "ADMIN" && adminMenu()}
        <br />
        {store.getState().reducers.authState.userType == "COMPANY" && companyMenu()}
        <br />
        {store.getState().reducers.authState.userType == "CUSTOMER" && customerMenu()}
        <br />
      </>
    </div>
  );
}

export default PageMenu;
