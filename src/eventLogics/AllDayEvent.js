import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const AllDayEvent = ({ event, isUpdated }) => {
  const navigate = useNavigate();
  const handleShow = () => {
    navigate("/allDayEvent-update/" + event._id);
    localStorage.setItem("updatingEvent", JSON.stringify(event));
  };

  const handleDelete = () => {
    const id = event._id;
    const endpoint = `/events/deleteAllDayEvent/${id}`;

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

  return (
    <>
      <box></box>
      <div
        className="event-all-day"
        id={event._id}
        style={{
          position: "relative",
          cursor: "default",
          filter: "brightness(90%)",
        }}
      >
        <p>All Day</p>
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

export default AllDayEvent;
