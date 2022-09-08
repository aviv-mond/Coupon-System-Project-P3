import { Route, Routes } from "react-router-dom";
import LoginScreen from "../../user/loginScreen/loginScreen";
import Page404 from "../../mainLayout/page404/page404";
import PageMain from "../../mainLayout/pageMain/pageMain";
import "./siteRouting.css";
import AddCompany from "../../admin/addCompany/addCompany";
import AddCustomer from './../../admin/addCustomer/addCustomer';
import DeleteCompany from './../../admin/deleteCompany/deleteCompany';
import DeleteCustomer from "../../admin/deleteCustomer/deleteCustomer";
import GetAllCompanies from './../../admin/getAllCompanies/getAllCompanies';
import GetAllCustomers from './../../admin/getAllCustomers/getAllCustomers';
import GetCompanyById from './../../admin/getCompanyById/getCompanyById';
import GetCustomerById from "../../admin/getCustomerById/getCustomerById";
import UpdateCompany from './../../admin/updateCompany/updateCompany';
import UpdateCustomer from './../../admin/updateCustomer/updateCustomer';
import AddCoupon from './../../company/addCoupon/addCoupon';
import DeleteCoupon from "../../company/deleteCoupon/deleteCoupon";
import UpdateCoupon from "../../company/updateCoupon/updateCoupon";
import GetAllCompanyCoupons from './../../company/getAllCompanyCoupons/getAllCompanyCoupons';
import GetCompanyCouponsByCategory from './../../company/getCompanyCouponsByCategory/getCompanyCouponsByCategory';
import GetCompanyCouponsByMaxPrice from './../../company/getCompanyCouponsByMaxPrice/getCompanyCouponsByMaxPrice';
import GetCompanyDetails from './../../company/getCompanyDetails/getCompanyDetails';
import GetAllCustomerCoupons from './../../customer/getAllCustomerCoupons/getAllCustomerCoupons';
import GetCustomerCouponsByCategory from './../../customer/getCustomerCouponsByCategory/getCustomerCouponsByCategory';
import GetCustomerCouponsByMaxPrice from './../../customer/getCustomerCouponsByMaxPrice/getCustomerCouponsByMaxPrice';
import GetCustomerDetails from './../../customer/getCustomerDetails/getCustomerDetails';
import PurchaseCoupon from './../../customer/purchaseCoupon/purchaseCoupon';

function SiteRouting(): JSX.Element {
    return (
        <div className="siteRouting">
			<Routes>
                <Route path="/" element={<PageMain/>}/>
                <Route index element={<PageMain/>}/>
                <Route path="login" element={<LoginScreen/>}/>
                <Route path="admin/addCompany" element={<AddCompany/>}/>
                <Route path="admin/addCustomer" element={<AddCustomer/>}/>
                <Route path="admin/deleteCompany" element={<DeleteCompany/>}/>
                <Route path="admin/deleteCustomer" element={<DeleteCustomer/>}/>
                <Route path="admin/getAllCompanies" element={<GetAllCompanies/>}/>
                <Route path="admin/getAllCustomers" element={<GetAllCustomers/>}/>
                <Route path="admin/getCompanyById" element={<GetCompanyById/>}/>
                <Route path="admin/getCustomerById" element={<GetCustomerById/>}/>
                <Route path="admin/updateCompany" element={<UpdateCompany/>}/>
                <Route path="admin/updateCustomer" element={<UpdateCustomer/>}/>

                <Route path="company/addCoupon" element={<AddCoupon/>}/>
                <Route path="company/deleteCoupon" element={<DeleteCoupon/>}/>
                <Route path="company/getAllCompanyCoupons" element={<GetAllCompanyCoupons/>}/>
                <Route path="company/getCompanyCouponsByCategory" element={<GetCompanyCouponsByCategory/>}/>
                <Route path="company/getCompanyCouponsByMaxPrice" element={<GetCompanyCouponsByMaxPrice/>}/>
                <Route path="company/getCompanyDetails" element={<GetCompanyDetails/>}/>
                <Route path="company/updateCoupon" element={<UpdateCoupon/>}/>

                <Route path="customer/getAllCustomerCoupons" element={<GetAllCustomerCoupons/>}/>
                <Route path="customer/getCustomerCouponsByCategory" element={<GetCustomerCouponsByCategory/>}/>
                <Route path="customer/getCustomerCouponsByMaxPrice" element={<GetCustomerCouponsByMaxPrice/>}/>
                <Route path="customer/getCustomerDetails" element={<GetCustomerDetails/>}/>
                <Route path="customer/purchaseCoupon" element={<PurchaseCoupon/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default SiteRouting;
