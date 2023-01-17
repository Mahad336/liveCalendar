import {
  Image,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import cld from "../calendarLogics/clock/calendar.jpg";

const Form = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      justify="center"
      alignItems="center"
      h="91vh"
      w="100%"
      bg="blackAlpha.400"
    >
      <Flex width="70%">
        <Image src={cld} height="60vh" width="60vw"></Image>
      </Flex>
      <Box
        bg={colorMode === "light" ? "gray.200" : "gray.600"}
        w="350px"
        p={3}
        rounded="lg"
        boxShadow="2xl"
      >
        <Tabs variant="enclosed-colored" isFitted m={4}>
          <TabList>
            <Tab>Sign Up</Tab>
            <Tab>Login</Tab>
          </TabList>
          <TabPanels mt={3}>
            <TabPanel>
              <SignupForm />
            </TabPanel>
            <TabPanel>
              <LoginForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Form;
