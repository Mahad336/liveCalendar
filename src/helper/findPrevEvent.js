import { getStartEndTime } from "./handleTimeConversion";

export const findPreviousEvent = (events, currentId) => {
  let currentIndex = events.findIndex((event) => event._id === currentId);
  let { startTime } = getStartEndTime(events[currentIndex]);
  let prevEventEndTime = getStartEndTime(events[currentIndex - 1])?.endTime;
  if (prevEventEndTime <= startTime) currentIndex--;

  return currentIndex === -1 || currentIndex === 0
    ? null
    : events[currentIndex - 1];
};
