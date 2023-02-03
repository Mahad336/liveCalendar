import React, { useRef, useEffect, useState } from "react";
import { timeString } from "../../helper/handleTimeConversion";
import { addClass } from "../../helper/addClass";
import { useNavigate } from "react-router-dom";

const Event = ({ event, setRenderedEvents, isUpdated, startTime, endTime }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const height = (endTime - startTime) * 100 - 2 + "px";
  const time = timeString(startTime);
  const [show, setShow] = useState(false);
  const [className, setClassName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    navigate("/event/" + event._id);
  };

  useEffect(() => {
    const el2 = ref.current;
    setClassName(addClass(height, event.startAt));
    setRenderedEvents(el2);
  }, []);

  return (
    <>
      <div
        className={className}
        ref={ref}
        id={event._id}
        style={{ height: `${height}`, position: "relative", cursor: "pointer" }}
        onClick={handleShow}
      >
        <div className="content">
          <p>{time}</p>
          <h5>{event.title}</h5>
          <span>{event.location}</span>
          <h5 style={{ display: "none" }}>{startTime}</h5>
          <h5 style={{ display: "none" }}>{endTime}</h5>
        </div>
      </div>
    </>
  );
};

export default Event;
