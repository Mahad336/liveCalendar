import { useState } from "react";
import AutoComplete from "../APIs/AutoComplete";
import { useNavigate } from "react-router-dom";
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

const Create = () => {
  const time = [];
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("lhr");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  for (let i = 0; i < 24; i++) {
    time.push(i);
    time.push(i + 0.5);
  }

  const handleSetLocation = (str) => {
    setLocation(str);
  };

  const handleDisable = (e) => {
    let allEndTimes = document.querySelector(".allEndTimes").childNodes;
    console.log(e.target.value);
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
    console.log(location);
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
      await fetch("/events/create", {
        method: "POST",
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
              <AutoComplete handleSetLocation={handleSetLocation} />
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
                <Button
                  type="submit"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  _active={{ boxShadow: "lg" }}
                >
                  Create
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

export default Create;
