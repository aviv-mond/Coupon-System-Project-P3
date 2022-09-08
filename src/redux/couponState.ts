import { Coupon } from "./../Models/Coupon";

export class CouponState {
  public coupons: Coupon[];
}

export enum CouponActionTypes {
  DownloadCoupons = "DownloadCoupons",
  AddCoupon = "AddCoupon",
  UpdateCoupon = "UpdateCoupon",
  DeleteCoupon = "DeleteCoupon",
}

export interface CouponAction {
  type: CouponActionTypes;
  payload?: any;
}

export function downloadCoupons(coupons: Coupon[]): CouponAction {
  return { type: CouponActionTypes.DownloadCoupons, payload: coupons };
}

export function addCoupon(coupon: Coupon): CouponAction {
  return { type: CouponActionTypes.AddCoupon, payload: coupon };
}

export function updateCoupon(coupon: Coupon): CouponAction {
  return { type: CouponActionTypes.UpdateCoupon, payload: coupon };
}

export function deleteCoupon(id: number): CouponAction {
  return { type: CouponActionTypes.DeleteCoupon, payload: id };
}

export function CouponReducer(
  currentState: CouponState = new CouponState(),
  action: CouponAction
): CouponState {
  const newState = { ...currentState };

  switch (action.type) {
    case CouponActionTypes.DownloadCoupons:
      newState.coupons = action.payload;
      break;
    case CouponActionTypes.AddCoupon:
      newState.coupons.push(action.payload);
      break;
    case CouponActionTypes.UpdateCoupon:
      newState.coupons = newState.coupons.filter((item) => {
        return !(item.id === action.payload.id);
      });
      newState.coupons.push(action.payload);
      break;
    case CouponActionTypes.DeleteCoupon:
      newState.coupons = newState.coupons.filter((item) => {
        return !(item.id === action.payload);
      });
      break;
  }

  return newState;
}
