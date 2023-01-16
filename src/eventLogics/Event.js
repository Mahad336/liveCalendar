import React, { useRef, useEffect, useState } from "react";
import { timeString } from "../calendarLogics/convertTime";
import { getClassName } from "../calendarLogics/getClassName";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import EventUpdate from "../updateEvents/eventUpdate";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Portal,
  Text,
  Box,
} from "@chakra-ui/react";

const Event = ({ event, setRenderedEvents, isUpdated, startTime, endTime }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const height = (endTime - startTime) * 100 - 2 + "px";
  const time = timeString(startTime);
  const [show, setShow] = useState(false);
  const [className, setClassName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    navigate("/event-update/" + event._id);
    localStorage.setItem("updatingEvent", JSON.stringify(event));
  };

  const handleDelete = () => {
    const id = event._id;
    const endpoint = `/events/delete/${id}`;

    fetch(endpoint, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        isUpdated();
        navigate("/calendar");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const el2 = ref.current;
    setClassName(getClassName(height, event.startAt));
    setRenderedEvents(el2);
  }, []);

  return (
    <>
      <div
        className={className}
        ref={ref}
        id={event._id}
        style={{ height: `${height}`, position: "relative", cursor: "default" }}
      >
        <p>{time}</p>
        <h5>{event.title}</h5>
        <span>{event.location}</span>
        <Popover size={30} placement="left-start">
          <PopoverTrigger>
            <Button
              position="absolute"
              right="10px"
              top="5px"
              cursor="pointer"
              width="auto"
              padding={0}
              bg="none"
            >
              <FiMoreVertical size={30} />
            </Button>
          </PopoverTrigger>

          <Portal>
            <PopoverContent maxW="fit-content" float="right">
              <PopoverArrow />
              <PopoverBody display="flex" flexDir="column">
                <Button colorScheme="gray" mb={2} onClick={handleShow}>
                  Edit
                </Button>
                <Button colorScheme="gray" onClick={handleDelete}>
                  Delete
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </div>
    </>
  );
};

export default Event;
