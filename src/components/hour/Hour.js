import Event from "../event/Event";
import { Box } from "@chakra-ui/react";
import { getStartEndTime } from "../../helper/handleTimeConversion";

const Hour = ({ currentHour, events }) => {
  let eventListTop = [];
  let eventListBot = [];

  if (events) {
    eventListTop = events.filter(
      (event) => getStartEndTime(event).startTime == currentHour
    );
    eventListBot = events.filter(
      (event) =>
        Math.floor(getStartEndTime(event).startTime) == currentHour &&
        getStartEndTime(event).startTime.includes(".")
    );
  }

  return (
    <Box filter="auto" brightness="90%">
      <div className="hour">
        <div className="full">{`${currentHour}:00`}</div>
        <div className="half">
          <div id={`full-${currentHour}`} className="half-top">
            {eventListTop.map((event) => (
              <Event
                event={event}
                key={event._id}
                startTime={getStartEndTime(event).startTime}
                endTime={getStartEndTime(event).endTime}
                events={events}
              />
            ))}
          </div>
          <div className="half-bottom">
            <div className="half-bottom-1">{`${currentHour}:30`}</div>
            <div className="half-bottom-2" id={`half-${currentHour}`}>
              {eventListBot.map((event) => (
                <Event
                  event={event}
                  startTime={getStartEndTime(event).startTime}
                  endTime={getStartEndTime(event).endTime}
                  key={event._id}
                  events={events}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Hour;
