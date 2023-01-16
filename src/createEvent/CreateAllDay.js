import { useState } from "react";
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
  Container,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import BeatLoader from "react-spinners/BeatLoader";

const CreateAllDay = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await fetch("/events/create-all-day-event", {
        method: "POST",
        body: JSON.stringify({
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
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<InfoIcon />} />
                  <Input
                    type="name"
                    placeholder="Location e.g isb, lahore, chicago"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Divider borderColor="gray.300" />

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

export default CreateAllDay;
