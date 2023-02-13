import Event from "../event/Event";
import { Box } from "@chakra-ui/react";
import { getStartEndTime } from "../../helper/handleTimeConversion";

const Hour = ({ currentHour, events }) => {
  const [eventListTop, eventListBot] = events
    ? events.reduce(
        (lists, event) => {
          const { startTime } = getStartEndTime(event);

          if (startTime == currentHour) {
            lists[0].push(event);
          } else if (
            Math.floor(startTime) == currentHour &&
            startTime.includes(".")
          ) {
            lists[1].push(event);
          }

          return lists;
        },
        [[], []]
      )
    : [[], []];

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
