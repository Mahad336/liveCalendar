import { useState } from "react";
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
import { Radio, RadioGroup } from "@chakra-ui/react";
import { StringtoDatetime } from "../../helper/handleTimeConversion";
import { createEvent } from "../../utils/eventsAPI";

const CreateEvent = () => {
  const [isAllDay, setIsAllDay] = useState("allday");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("lhr");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0.5");
  const [isPending, setIsPending] = useState(false);
  let time = [];

  const navigate = useNavigate();

  // making array of 24 hours
  time = Array.from({ length: 48 }, (v, i) => i / 2);

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
    let alldayCheck = isAllDay == "allday" ? true : false;
    const result = await createEvent(
      title,
      location,
      startAt,
      endAt,
      alldayCheck
    );
    if (result) navigate("/calendar");
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
              <AutoComplete handleSetLocation={handleSetLocation} />
              <Divider borderColor="gray.300" />

              <RadioGroup onChange={setIsAllDay} value={isAllDay}>
                <Stack direction="row">
                  <Radio value="allday">All day</Radio>
                  <Radio value="timely">Timely</Radio>
                </Stack>
              </RadioGroup>
              {isAllDay == "timely" && (
                <>
                  {" "}
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
                </>
              )}
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

export default CreateEvent;
