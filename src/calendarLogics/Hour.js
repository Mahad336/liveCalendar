import Event from "../eventLogics/Event";
import { Box } from "@chakra-ui/react";

const Hour = ({ currentHour, events, setRenderedEvents, isUpdated }) => {
  const eventListTop = [];
  const eventListBot = [];
  events &&
    events.sort((a, b) => (a.endAt - a.startAt < b.endAt - b.startAt ? -1 : 1));

  events &&
    events.forEach((event) => {
      let startTime = new Date(event.startAt);
      let endTime = new Date(event.endAt);
      if (startTime.getMinutes() == "30") {
        startTime = startTime.getHours() + ".5";
      } else {
        startTime = startTime.getHours().toString();
      }
      if (endTime.getMinutes() == "30") {
        endTime = endTime.getHours() + ".5";
      } else {
        endTime = endTime.getHours().toString();
      }

      if (startTime == currentHour) {
        eventListTop.push(
          <Event
            event={event}
            key={event._id}
            setRenderedEvents={setRenderedEvents}
            isUpdated={isUpdated}
            startTime={startTime}
            endTime={endTime}
          />
        );
      } else if (Math.floor(startTime) == currentHour) {
        eventListBot.push(
          <Event
            event={event}
            setRenderedEvents={setRenderedEvents}
            isUpdated={isUpdated}
            startTime={startTime}
            endTime={endTime}
            key={event._id}
          />
        );
      }
    });

  return (
    <Box filter="auto" brightness="90%">
      <div className="hour">
        <div className="full">{currentHour + ":00"}</div>
        <div className="half">
          <div id={`full-${currentHour}`} className="half-top">
            {eventListTop}
          </div>
          <div className="half-bottom">
            <div className="half-bottom-1">{currentHour + ":30"}</div>
            <div className="half-bottom-2" id={`half-${currentHour}`}>
              {eventListBot}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Hour;
