import axiosConfig from "./axiosConfig";

export const fetchAllEvents = async () => {
  const result = await axiosConfig.get("/events");
  return result.data.data;
};

export const createEvent = async (
  title,
  location,
  startAt,
  endAt,
  isAllDay
) => {
  return await axiosConfig.post("/events/", {
    title,
    location,
    startAt,
    endAt,
    isAllDay,
  });
};

export const updateEvent = async (id, title, location, startAt, endAt) => {
  return await axiosConfig.put(`/events/${id}`, {
    title,
    location,
    startAt,
    endAt,
  });
};

export const deleteEvent = async (id) => {
  return await axiosConfig.delete(`/events/${id}`);
};
