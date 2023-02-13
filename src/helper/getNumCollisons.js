import { filter } from "@chakra-ui/react";
import { findPreviousEvent } from "./findPrevEvent";
import { getStartEndTime } from "./handleTimeConversion";

export const getNumberOfCollisions = (events, currEvent) => {
  let filteredEvents = events.filter((event) => {
    let { startTime, endTime } = getStartEndTime(event);
    let currEventStartTime = getStartEndTime(currEvent).startTime;
    return endTime > currEventStartTime && startTime < currEventStartTime;
  });
  let currEventStartTime = getStartEndTime(currEvent)?.startTime;

  return filteredEvents.length;
};

export const getMaxNumOfCollision = (events, currEvent, st) => {
  let count = 0;
  if (getStartEndTime(findPreviousEvent(events, currEvent._id)).startTime == st)
    return;
  const uniqueEvents = events.filter((event, index) => {
    return (
      events
        .slice(0, index)
        .some(
          (previousEvent) =>
            getStartEndTime(previousEvent).startTime ==
              getStartEndTime(event).startTime &&
            getStartEndTime(previousEvent).endTime ==
              getStartEndTime(event).endTime
        ) == false
    );
  });

  if (getNumberOfCollisions(uniqueEvents, currEvent) > 0) {
    while (getNumberOfCollisions(uniqueEvents, currEvent) > 0) {
      currEvent = findPreviousEvent(uniqueEvents, currEvent._id);
      count++;
    }
  }
  return count;
};
