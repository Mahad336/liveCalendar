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
import {
  deleteEvent,
  fetchAllEvents,
  updateEvent,
} from "../../utils/eventsAPI";
import { StringtoDatetime } from "../../helper/handleTimeConversion";
import { useQuery } from "react-query";

const EventUpdate = ({ event }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("lhr");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const [currEvent, setCurrEvent] = useState();
  const id = window.location.href.split("/")[4];
  let time = Array.from({ length: 48 }, (_, i) => i / 2);
  const navigate = useNavigate();

  const { data } = useQuery("allEvents", fetchAllEvents);

  useEffect(() => {
    data && setCurrEvent(data.events.filter((e) => e._id == id)[0]);
  }, [data]);

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

    const { startAt, endAt } = StringtoDatetime(startTime, endTime);
    setIsPending(true);
    const result = await updateEvent(id, title, location, startAt, endAt);
    if (result) navigate("/calendar");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const result = await deleteEvent(id);
    if (result) navigate("/calendar");
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
