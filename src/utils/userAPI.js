import axiosConfig from "./axiosConfig";
import { clearEmailToken } from "./handleToken";
import { useNavigate } from "react-router-dom";

export const loginUser = async (email, password) => {
  try {
    const result = await axiosConfig.post("./user/login", { email, password });
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const signUpUser = async (email, password, firstName, lastName) => {
  try {
    const result = await axiosConfig.post("./user/signup", {
      email,
      password,
      firstName,
      lastName,
    });
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const logoutUser = async () => {
  try {
    const result = await axiosConfig.get("/user/logout");

    if (result) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
