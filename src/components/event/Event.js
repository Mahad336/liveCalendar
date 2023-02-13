import React, { useRef, useEffect, useState } from "react";
import { datetimetoString } from "../../helper/handleTimeConversion";
import { addClass } from "../../helper/addClass";
import { useNavigate } from "react-router-dom";
import { getMaxNumOfCollision } from "../../helper/getNumCollisons.js";

const Event = ({ event, startTime, endTime, events }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const height = (endTime - startTime) * 100 - 2 + "px";
  const time = datetimetoString(startTime);
  const [className, setClassName] = useState("");
  let marginLeft;

  marginLeft = getMaxNumOfCollision(events, event, startTime) * 80 + "px";

  const handleEdit = () => {
    navigate("/event/" + event._id);
  };

  useEffect(() => {
    setClassName(addClass(height, event.startAt));
  }, []);

  return (
    <>
      <div
        className={className}
        ref={ref}
        id={event._id}
        style={{
          height: `${height}`,
          position: "relative",
          cursor: "pointer",
          marginLeft: `${marginLeft}`,
        }}
        onClick={handleEdit}
      >
        <div className="content">
          <p>{time}</p>
          <h5>{event.title}</h5>
          <span>{event.location}</span>
        </div>
      </div>
    </>
  );
};

export default Event;
