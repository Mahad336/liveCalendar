import { useEffect, useState } from "react";
import AllDayEvent from "../../components/event/AllDayEvent";
import Hour from "../../components/hour/Hour";
import { fetchAllEvents } from "../../utils/eventsAPI";
import { useQuery } from "react-query";

const Calendar = () => {
  const amHours = [];
  const pmHours = [];
  const renderedEvents = [];
  const [events, setEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);

  const { data } = useQuery("allEvents", fetchAllEvents);

  async function getEvents(data) {
    let sortedEvents = data.events.sort((a, b) => {
      let astartTime = new Date(a.startAt);
      let bstartTime = new Date(b.startAt);
      let aendTime = new Date(a.endAt);
      let bendTime = new Date(b.endAt);
      if (astartTime.getMinutes() == "30") {
        astartTime = astartTime.getHours() + ".5";
      } else {
        astartTime = astartTime.getHours().toString();
      }
      if (aendTime.getMinutes() == "30") {
        aendTime = aendTime.getHours() + ".5";
      } else {
        aendTime = aendTime.getHours().toString();
      }
      if (bstartTime.getMinutes() == "30") {
        bstartTime = bstartTime.getHours() + ".5";
      } else {
        bstartTime = bstartTime.getHours().toString();
      }
      if (bendTime.getMinutes() == "30") {
        bendTime = bendTime.getHours() + ".5";
      } else {
        bendTime = bendTime.getHours().toString();
      }

      if (astartTime !== bstartTime) {
        return astartTime - bstartTime;
      }
      return aendTime - astartTime - (bendTime - bstartTime);
    });

    setEvents(sortedEvents.filter((e) => e.isAllDay == false));
    setDayEvents(sortedEvents.filter((e) => e.isAllDay == true));
  }

  function setRenderedEvents(event) {
    //renderedEvents.push(event);
  }

  for (let i = 0; i < 12; i++) {
    amHours.push(i);
    pmHours.push(i + 12);
  }

  useEffect(() => {
    if (data) getEvents(data);
    //eventsAlignment(renderedEvents);
  }, [data]);

  return (
    <div className="calendar">
      <header>
        <p>
          Funday,<span> </span> Nov 2
        </p>
      </header>
      <div className="all-day-task">
        {dayEvents &&
          dayEvents.map((event) => (
            <AllDayEvent event={event} key={event._id} />
          ))}
      </div>
      <div className="am">
        <h1>AM</h1>
        <div className="hours">
          {events &&
            amHours.map((hour, index) => (
              <Hour
                currentHour={hour}
                key={index}
                events={events}
                //setRenderedEvents={setRenderedEvents}
              />
            ))}
        </div>
      </div>
      <div className="pm">
        <h1>PM</h1>
        <div className="hours">
          {events &&
            pmHours.map((hour, index) => (
              <Hour
                currentHour={hour}
                key={index}
                events={events}
                // setRenderedEvents={setRenderedEvents}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
