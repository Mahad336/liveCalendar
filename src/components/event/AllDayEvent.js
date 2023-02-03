import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AllDayEvent = ({ event, isUpdated }) => {
  const navigate = useNavigate();
  const handleShow = () => {
    navigate("/event/" + event._id);
  };

  return (
    <>
      <div
        className="event-all-day"
        id={event._id}
        onClick={handleShow}
        style={{
          position: "relative",
          filter: "brightness(90%)",
        }}
      >
        <p>All Day</p>
        <h5>{event.title}</h5>
        <span>{event.location}</span>
      </div>
    </>
  );
};

export default AllDayEvent;
