import { Notyf } from "notyf";

export enum SccMsg {
    LOGIN_SUCCESS = "Login successful",
    PURCHASE_SUCCESS = "Purchase successfull",
    
    COMPANY_ADDED = "Company successfully added",
    COMPANY_UPDATED = "Company successfully updated",
    COMPANY_DELETED = "Company successfully deleted",
    
    CUSTOMER_ADDED = "Customer successfully added",
    CUSTOMER_UPDATED = "Customer successfully updated",
    CUSTOMER_DELETED = "Customer successfully deleted",
    
    COUPON_ADDED = "Coupon successfully added",
    COUPON_UPDATED = "Coupon successsfully updated",
    COUPON_DELETED = "Coupon successfully deleted",
}

export enum ErrMsg {
    LOGIN_ERROR = "Login failed",
    GENERAL_ERROR = "Something went wrong with loading page!",
    LOGIN_AUTHORIZATION_NEEDED = "You need to be logged in to access this page!",
    
    COMPANY_ADD_ERROR_EXISTS = "Company already exists",
    COMPANY_NOT_FOUND = "Could not find companies",
    NO_COMPANIES_EXIST = "No companies in database",
    NO_COMPANY_COUPONS = "Company doesn't have any coupon",
    
    NO_COUPONS_CATEGORY = "No coupons found in that category",
    NO_COUPONS_PRICE = "No coupons found under that price",
    COUPON_NOT_FOUND = "Could not find coupons",
    COUPON_ADD_ERROR_EXISTS = "Coupon already exists",

    CUSTOMER_NOT_FOUND = "Could not find customers",
    CUSTOMER_ADD_ERROR_EXISTS = "Customer already exists",
    NO_CUSTOMERS_EXIST = "No customers in database",
    NO_CUSTOMER_COUPONS = "Customer doesn't have any coupons",

    PURCHASE_FAILED = "Coupon not purchased! You may already own it, or it may be out of stock.",
}

class Notify {
    private notification = new Notyf({
        duration: 5000,
        position: {x: "center", y: "top"}
    });

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const message = this.extractMsg(err);
        this.notification.error(message);
    }

    public extractMsg(err: any):string {
        if (typeof err === 'string') {
            return err;
        }
        if (typeof err?.response?.data === 'string') {
            return err?.response?.data;
        }
        if (Array.isArray(err?.response?.data)) {
            return err?.response?.data[0];
        }
        if (typeof err?.message === 'string') {
            return err?.message;
        }

        return "An unknown error has occured!";
    }
}

const notify = new Notify();
export default notify;
