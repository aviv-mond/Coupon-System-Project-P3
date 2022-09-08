import { Coupon } from './Coupon';

export class Company {
    id?: number;
    name: string;
    email: string;
    password?: string;
    coupons?: Coupon[];
}