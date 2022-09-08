
export class AuthState {
  public userType: string;
  public isLogged: boolean = false;
  public token: string;
}


export enum AuthActionTypes {
  LoginUser = "LoginUser",
  LogoutUser = "LogoutUser",
  UpdateToken = "UpdateToken",
}


export interface AuthAction {
  type: AuthActionTypes;
  payload?: any;
}


export function loginUser(userType: string): AuthAction {
  return { type: AuthActionTypes.LoginUser, payload: userType };
}

export function logoutUser(): AuthAction {
  return { type: AuthActionTypes.LogoutUser };
}

export function updateToken(token: string): AuthAction {
  return { type: AuthActionTypes.UpdateToken, payload: token };
}


export function AuthReducer(
  currentState: AuthState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionTypes.LoginUser:
      newState.userType = action.payload;
      newState.isLogged = true;
      break;
    case AuthActionTypes.LogoutUser:
      newState.token = "";
      localStorage.removeItem("jwt");
      newState.userType = "GUEST";
      newState.isLogged = false;
      break;
    case AuthActionTypes.UpdateToken:
      newState.token = action.payload;
      localStorage.setItem("jwt", action.payload);
      break;
  }

  return newState;
}
