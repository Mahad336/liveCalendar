import { useEffect, useState } from "react";
import AutoComplete from "../APIs/AutoComplete";
import { json, useNavigate } from "react-router-dom";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  Divider,
  Text,
  FormLabel,
  Flex,
  Select,
  Container,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import BeatLoader from "react-spinners/BeatLoader";
import { Envelope } from "react-bootstrap-icons";

const AllDayEventUpdate = ({ event }) => {
  const time = [];
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("lhr");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const id = window.location.href.split("/")[4];

  const navigate = useNavigate();

  for (let i = 0; i < 24; i++) {
    time.push(i);
    time.push(i + 0.5);
  }

  const handleSetLocation = (str) => {
    setLocation(str);
  };

  const openedEvent = localStorage.getItem("updatingEvent");
  let Title = JSON.parse(openedEvent)?.title;
  let Loc = JSON.parse(openedEvent)?.location;
  localStorage.removeItem("updatingEvent");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startAt = new Date();
    const endAt = new Date();
    if (startTime.includes(".")) {
      startAt.setHours(
        startTime.substring(0, startTime.indexOf(".")),
        "30",
        "00"
      );
    } else {
      startAt.setHours(startTime, "00", "00");
    }
    if (endTime.includes(".")) {
      endAt.setHours(endTime.substring(0, endTime.indexOf(".")), "30", "00");
    } else {
      endAt.setHours(endTime, "00", "00");
    }
    setIsPending(true);
    try {
      await fetch("/events/updateAllDayEvent", {
        method: "PUT",
        body: JSON.stringify({
          id,
          title,
          location,
        }),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/calendar");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Flex justify="center" alignItems="center" h="91vh" w="100%">
        <form action="submit" onSubmit={handleSubmit}>
          <Container boxShadow="2xl" minW="30vw">
            <Stack spacing={3} pb={25}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<InfoIcon />} />
                  <Input
                    type="name"
                    placeholder="Event Name"
                    defaultValue={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<InfoIcon />} />
                  <Input
                    type="name"
                    placeholder="Location e.g isb, lahore, chicago"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </InputGroup>
              </FormControl> */}
              <AutoComplete handleSetLocation={handleSetLocation} Loc={Loc} />
              <Divider borderColor="gray.300" />

              {!isPending && (
                <Button
                  type="submit"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  _active={{ boxShadow: "lg" }}
                >
                  Update
                </Button>
              )}
              {isPending && (
                <>
                  <BeatLoader
                    size={10}
                    style={{ marginTop: "20px" }}
                  ></BeatLoader>
                </>
              )}
            </Stack>
          </Container>
        </form>
      </Flex>
    </>
  );
};

export default AllDayEventUpdate;
