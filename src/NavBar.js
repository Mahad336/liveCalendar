import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  IconButton,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { CalendarIcon, CheckIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import clock from "./calendarLogics/clock/clock.jpg";
import clndr from "./calendarLogics/clock/calendar.jpg";
import clc from "./calendarLogics/clock/clc.png";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.400", dark: "gray.700" };
  const textColor = { light: "black", dark: "gray.100" };

  const navigate = useNavigate();
  const logOut = () => {
    const result = fetch("/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        // if (result.ok) {
        localStorage.removeItem("email");
        navigate("/form");
        //}
      })
      .catch((err) => console.log(err));
  };
  const email = localStorage.getItem("email");

  return (
    <Flex
      bg={bgColor[colorMode]}
      w="100%"
      color={textColor[colorMode]}
      boxShadow="md"
    >
      <Flex p={5} ml={7} w="100%">
        {email && (
          <>
            <Flex
              gap={2}
              justifyContent="start"
              alignItems="center"
              width="100%"
            >
              <Text>{email}</Text>
              <a onClick={logOut}>
                <Button ml={5} color="teal.700" size="sm">
                  Logout
                </Button>
              </a>
              <Box>
                <IconButton
                  ml={5}
                  rounded="full"
                  onClick={toggleColorMode}
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                >
                  Change Color Mode
                </IconButton>
              </Box>
            </Flex>
            <Image src={clc} boxSize={20}></Image>
            <Flex
              color={textColor[colorMode]}
              ml={35}
              w="45%"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Link to="calendar" className="nav-link">
                View Calendar
              </Link>
              <Link to="create-event" className="nav-link">
                Create Event
              </Link>
              <Link to="create-all-day" className="nav-link">
                Create All-Day Event
              </Link>
            </Flex>
          </>
        )}
        {!email && (
          <>
            <Flex gap={2} justifyContent="end" alignItems="center" width="100%">
              <Link to="/form">
                <Button ml={5} color="teal.500" size="sm" href="sign-up">
                  Register
                </Button>
              </Link>
              <Link to="/form">
                <Button ml={5} color="teal.500" size="sm">
                  Login
                </Button>
              </Link>
              <Box>
                <IconButton
                  ml={5}
                  rounded="full"
                  onClick={toggleColorMode}
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                >
                  Change Color Mode
                </IconButton>
              </Box>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
