import { useEffect, useState } from "react";
import AllDayEvent from "../../components/event/AllDayEvent";
import Hour from "../../components/hour/Hour";
import { fetchAllEvents } from "../../utils/eventsAPI";
import { useQuery } from "react-query";
import { getStartEndTime } from "../../helper/handleTimeConversion";

const Calendar = () => {
  const amHours = Array.from({ length: 12 }, (_, i) => i);
  const pmHours = Array.from({ length: 12 }, (_, i) => i + 12);

  const [sortedEvents, setSortedEvents] = useState([]);
  const [allDayEvents, setAllDayEvents] = useState([]);

  const { data } = useQuery("allEvents", fetchAllEvents);

  useEffect(() => {
    if (data) {
      setSortedEvents(
        data.events
          .sort((a, b) => {
            const { startTime: astartTime, endTime: aendTime } =
              getStartEndTime(a);
            const { startTime: bstartTime, endTime: bendTime } =
              getStartEndTime(b);

            return astartTime === bstartTime
              ? aendTime - bendTime
              : astartTime - bstartTime;
          })
          .filter((event) => !event.isAllDay)
      );

      setAllDayEvents(data.events.filter((event) => event.isAllDay));
    }
  }, [data]);

  return (
    <div className="calendar">
      <header>
        <p>
          Funday,<span> </span> Nov 2
        </p>
      </header>
      <div className="all-day-task">
        {allDayEvents.map((event) => (
          <AllDayEvent event={event} key={event._id} />
        ))}
      </div>
      <div className="am">
        <h1>AM</h1>
        <div className="hours">
          {amHours.map((hour) => (
            <Hour currentHour={hour} key={hour} events={sortedEvents} />
          ))}
        </div>
      </div>
      <div className="pm">
        <h1>PM</h1>
        <div className="hours">
          {pmHours.map((hour) => (
            <Hour currentHour={hour} key={hour} events={sortedEvents} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
