import axiosConfig from "./axiosConfig";

export const fetchAllEvents = async () => {
  const result = await axiosConfig.get("/events", { withCredentials: true });
  return result.data.data;
};
