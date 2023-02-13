import { useEffect, useState } from "react";
import AutoComplete from "../../components/autoComplete/autoComplete";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  Divider,
  FormLabel,
  Flex,
  Select,
  Container,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import BeatLoader from "react-spinners/BeatLoader";
import { fetchAllEvents } from "../../utils/eventsAPI";
import { useQuery } from "react-query";

const EventUpdate = ({ event }) => {
  const time = [];
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("lhr");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const [currEvent, setCurrEvent] = useState();
  const id = window.location.href.split("/")[4];
  const navigate = useNavigate();

  const { data } = useQuery("allEvents", fetchAllEvents);

  useEffect(() => {
    data && setCurrEvent(data.events.filter((e) => e._id == id)[0]);
  }, [data]);

  for (let i = 0; i < 24; i++) {
    time.push(i);
    time.push(i + 0.5);
  }

  const handleSetLocation = (str) => {
    setLocation(str);
  };

  const handleDisable = (e) => {
    let allEndTimes = document.querySelector(".allEndTimes").childNodes;

    allEndTimes.forEach((e) => (e.disabled = false));
    for (let i = 0; i < allEndTimes.length; i++) {
      if (e.target.value == allEndTimes[i].textContent) {
        allEndTimes[i].disabled = "true";
        allEndTimes[i + 1].selected = "selected";
        break;
      } else allEndTimes[i].disabled = "true";
    }
    setStartTime(e.target.value);
  };

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
      await fetch("/events/" + id, {
        method: "PUT",
        body: JSON.stringify({
          title,
          location,
          startAt,
          endAt,
        }),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/calendar");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const endpoint = `/events/${id}`;

    fetch(endpoint, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        navigate("/calendar");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Flex justify="center" alignItems="center" h="91vh" w="100%">
        <form action="submit">
          <Container boxShadow="2xl" minW="30vw">
            <Stack spacing={3} pb={25}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<InfoIcon />} />
                  <Input
                    type="name"
                    placeholder="Event Name"
                    defaultValue={currEvent?.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <AutoComplete
                handleSetLocation={handleSetLocation}
                LOC={currEvent?.location}
              />
              <Divider borderColor="gray.300" />

              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Select defaultValue="0" onChange={handleDisable}>
                  {time.map((t) => (
                    <option value={t} key={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Select
                  className="allEndTimes"
                  defaultValue="0.5"
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {time.map((t) => (
                    <option value={t} key={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {!isPending && (
                <>
                  <Button
                    type="submit"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    _active={{ boxShadow: "lg" }}
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                  <Button
                    type="submit"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    _active={{ boxShadow: "lg" }}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </>
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

export default EventUpdate;
