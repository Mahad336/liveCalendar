import { findPreviousEvent } from "./findPrevEvent";
import { getStartEndTime } from "./handleTimeConversion";

const calculateEventCollisions = (events, currEvent) => {
  // returning the number of collisions with any other events
  const filteredEvents = events.filter((event) => {
    let { startTime, endTime } = getStartEndTime(event);
    let currEventStartTime = getStartEndTime(currEvent).startTime;
    return endTime > currEventStartTime && startTime < currEventStartTime;
  });

  return filteredEvents.length;
};

export const getMaxNumOfCollision = (events, currEvent, startTime) => {
  //so if two events are starting from same time so it just return and flex will handle them itself

  let count = 0;
  if (
    getStartEndTime(findPreviousEvent(events, currEvent._id)).startTime ==
    startTime
  )
    return;

  //so for remaining events we have to see them as unique events thats why
  const uniqueEvents = events.filter((event, index) => {
    return (
      events
        .slice(0, index)
        .some(
          (previousEvent) =>
            getStartEndTime(previousEvent).startTime ==
            getStartEndTime(event).startTime
        ) == false
    );
  });

  //looping back to get the count till previousEvent is not null

  if (calculateEventCollisions(uniqueEvents, currEvent) > 0) {
    while (calculateEventCollisions(uniqueEvents, currEvent) > 0) {
      currEvent = findPreviousEvent(uniqueEvents, currEvent._id);
      count++;
    }
  }
  return count;
};
