import axiosConfig from "./axiosConfig";
export const loginUser = async (email, password) => {
  try {
    const result = await axiosConfig.post(
      "./user/login",
      { email, password },
      { withCredentials: true }
    );
    return result.data;
  } catch (e) {
    return e.response;
  }
};

export const signUpUser = async (email, password, firstName, lastName) => {
  try {
    const result = await axiosConfig.post(
      "./user/signup",
      {
        email,
        password,
        firstName,
        lastName,
      },
      { withCredentials: true }
    );
    return result.data;
  } catch (e) {
    return e.response;
  }
};
