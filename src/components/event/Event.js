import React, { useRef, useEffect, useState } from "react";
import { datetimetoString } from "../../helper/handleTimeConversion";
import { useNavigate } from "react-router-dom";
import { getMaxNumOfCollision } from "../../helper/getNumCollisons.js";

const Event = ({ event, startTime, endTime, events }) => {
  const navigate = useNavigate();
  const height = (endTime - startTime) * 100 - 2 + "px";
  const className = parseInt(height) <= 50 ? "event-half-bot" : "event";
  const time = datetimetoString(startTime);
  let marginLeft;

  marginLeft = getMaxNumOfCollision(events, event, startTime) * 80 + "px";

  const handleEdit = () => {
    navigate("/event/" + event._id);
  };

  return (
    <>
      <div
        className={className}
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
