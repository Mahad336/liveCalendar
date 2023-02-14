import React, { useMemo } from "react";
import Event from "../event/Event";
import { Box } from "@chakra-ui/react";
import { getStartEndTime } from "../../helper/handleTimeConversion";

const Hour = ({ currentHour, events }) => {
  const eventMap = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      const key = getStartEndTime(event).startTime;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(event);
    });
    return map;
  }, [events]);

  const filteredEventsTop = eventMap[`${currentHour}`] || [];
  const filteredEventsBot = eventMap[`${currentHour}.5`] || [];

  return (
    <Box filter="auto" brightness="90%">
      <div className="hour">
        <div className="full">{`${currentHour}:00`}</div>
        <div className="half">
          <div id={`full-${currentHour}`} className="half-top">
            {filteredEventsTop.map((event) => (
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
              {filteredEventsBot.map((event) => (
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
