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
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
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
        localStorage.removeItem("email");
        navigate("/form");
      })
      .catch((err) => console.log(err));
  };
  const email = localStorage.getItem("email");

  return (
    <Flex
      bg={bgColor[colorMode]}
      bgGradient="linear(to-r, gray.400, darkgray)"
      w="100%"
      color={textColor[colorMode]}
      boxShadow="md"
    >
      <Flex p={1} ml={7} w="100%">
        <>
          {email && (
            <Flex
              gap={2}
              justifyContent="space-evenly"
              alignItems="center"
              width="30%"
            >
              <Text>{email}</Text>
              <a onClick={logOut}>
                <Button color="teal.700" size="sm">
                  Logout
                </Button>
              </a>
              <Box>
                <IconButton
                  rounded="full"
                  onClick={toggleColorMode}
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                >
                  Change Color Mode
                </IconButton>
              </Box>

              <Image
                display="flex"
                src={clc}
                boxSize={20}
                cursor="pointer"
                onClick={() => navigate("/calendar")}
              ></Image>
            </Flex>
          )}
          {!email && (
            <Box width="80%" ml="20%" display="flex" justifyContent="center">
              <Text
                boxShadow="2xl"
                fontSize="6xl"
                fontFamily="sans-serif"
                color="blackAlpha.800"
                borderRadius="md"
                bgGradient="linear(to-t, gray.400, gray.500)"
              >
                CALENDAR
              </Text>
            </Box>
          )}
          {email && (
            <Box width="40%" display="flex" justifyContent="center">
              <Text
                boxShadow="2xl"
                fontSize="6xl"
                fontFamily="sans-serif"
                color="blackAlpha.800"
                borderRadius="md"
                bgGradient="linear(to-t, gray.400, gray.500)"
              >
                CALENDAR
              </Text>
            </Box>
          )}

          {email && (
            <Flex
              color={textColor[colorMode]}
              w="30%"
              justifyContent="space-evenly"
              alignItems="center"
            >
              {!window.location.href.includes("calendar") && (
                <Link to="calendar">View Calendar</Link>
              )}
              <Link to="create-event">Create Event</Link>
              <Link to="create-all-day">Create All-Day Event</Link>
            </Flex>
          )}
        </>

        {!email && (
          <>
            <Flex gap={2} justifyContent="end" alignItems="center" width="20%">
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
