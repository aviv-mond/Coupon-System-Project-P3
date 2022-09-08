import axios from "axios";
import { updateToken } from "../redux/authState";
import store from "../redux/store";

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use((request) => {
  request.headers = {
    authorization: store.getState().reducers.authState.token,
  };
  return request;
});

jwtAxios.interceptors.response.use((response) => {
  localStorage.setItem("jwt", response.headers.authorization);
  store.dispatch(updateToken(response.headers.authorization));
  return response;
});

export default jwtAxios;
