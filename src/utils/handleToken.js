export const getEmailToken = () => {
  return localStorage.getItem("email");
};

export const setEmailToken = (data) => {
  localStorage.setItem("email", data);
};
export const clearEmailToken = () => {
  localStorage.removeItem("email");
};
