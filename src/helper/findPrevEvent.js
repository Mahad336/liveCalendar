import { getStartEndTime } from "./handleTimeConversion";

export const findPreviousEvent = (events, currEventId) => {
  const currEventIndex = events.findIndex((event) => event._id === currEventId);
  if (currEventIndex === -1 || currEventIndex === 0) return null;

  const { startTime } = getStartEndTime(events[currEventIndex]);
  const prevEvent = events[currEventIndex - 1];
  const prevEventEndTime = getStartEndTime(prevEvent)?.endTime;
  return prevEventEndTime <= startTime
    ? findPreviousEvent(events, prevEvent._id)
    : prevEvent;
};

// import { getStartEndTime } from "./handleTimeConversion";

// export const findPreviousEvent = (events, targetId) => {
//   let targetIndex = events.findIndex((event) => event._id === targetId);
//   let { startTime } = getStartEndTime(events[targetIndex]);
//   let prevEventEndTime = getStartEndTime(events[targetIndex - 1])?.endTime;
//   if (prevEventEndTime <= startTime) targetIndex--;

//   return targetIndex === -1 || targetIndex === 0
//     ? null
//     : events[targetIndex - 1];
// };
