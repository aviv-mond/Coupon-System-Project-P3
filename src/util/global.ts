class Globals {

}

class DevelopmentGlobals extends Globals {
    public urls = {
        login: "http://localhost:8080/user/login",
        allCoupons: "http://localhost:8080/coupons/all",
        
        adminAddCompany: "http://localhost:8080/admin/add/company",
        adminAddCustomer: "http://localhost:8080/admin/add/customer",
        adminDeleteCompany: "http://localhost:8080/admin/delete/company/",
        adminDeleteCustomer: "http://localhost:8080/admin/delete/customer/",
        adminAllCompany: "http://localhost:8080/admin/all/companies",
        adminAllCustomer: "http://localhost:8080/admin/all/customers",
        adminCompany: "http://localhost:8080/admin/company/",
        adminCustomer: "http://localhost:8080/admin/customer/",
        adminUpdateCompany: "http://localhost:8080/admin/update/company",
        adminUpdateCustomer: "http://localhost:8080/admin/update/customer",
        
        companyAddCoupon: "http://localhost:8080/company/coupons/add",
        companyDeleteCoupon: "http://localhost:8080/company/coupons/delete/",
        companyUpdateCoupon: "http://localhost:8080/company/coupons/update",
        companyAllCoupon: "http://localhost:8080/company/coupons/all",
        companyCouponCategory: "http://localhost:8080/company/coupons/cat/",
        companyCouponPrice: "http://localhost:8080/company/coupons/max/",
        companyDetails: "http://localhost:8080/company/details",
        
        customerAllCoupon: "http://localhost:8080/customer/coupons/all",
        customerCouponCategory: "http://localhost:8080/customer/coupons/cat/",
        customerCouponPrice: "http://localhost:8080/customer/coupons/max/",
        customerDetails: "http://localhost:8080/customer/details",
        customerPurchaseCoupon: "http://localhost:8080/customer/coupons/purchase" 
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        login: "/user/login",
        allCoupons: "/coupons/all",
        
        adminAddCompany: "/admin/add/company",
        adminAddCustomer: "/admin/add/customer",
        adminDeleteCompany: "/admin/delete/company/",
        adminDeleteCustomer: "/admin/delete/customer/",
        adminAllCompany: "/admin/all/companies",
        adminAllCustomer: "/admin/all/customers",
        adminCompany: "/admin/company/",
        adminCustomer: "/admin/customer/",
        adminUpdateCompany: "/admin/update/company",
        adminUpdateCustomer: "/admin/update/customer",
        
        companyAddCoupon: "/company/coupons/add",
        companyDeleteCoupon: "/company/coupons/delete/",
        companyUpdateCoupon: "/company/coupons/update",
        companyAllCoupon: "/company/coupons/all",
        companyCouponCategory: "/company/coupons/cat/",
        companyCouponPrice: "/company/coupons/max/",
        companyDetails: "/company/details",
        
        customerAllCoupon: "/customer/coupons/all",
        customerCouponCategory: "/customer/coupons/cat/",
        customerCouponPrice: "/customer/coupons/max/",
        customerDetails: "/customer/details",
        customerPurchaseCoupon: "/customer/coupons/purchase"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;
export default globals;
