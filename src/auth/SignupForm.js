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
  Text,
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      if (data.errors) {
        console.log(data.errors);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data.user) {
        setIsPending(true);
        localStorage.setItem("email", data.email);
        navigate("/calendar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<InfoIcon />} />
            <Input
              type="name"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<InfoIcon />} />
            <Input
              type="name"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Divider borderColor="gray.300" />
        <FormControl isRequired d="flex">
          <InputGroup>
            <InputLeftElement children={<EmailIcon />} />
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Text color="red">{emailError}</Text>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Text color="red">{passwordError}</Text>
        {!isPending && (
          <Button
            type="submit"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            _active={{ boxShadow: "lg" }}
          >
            Sign up!
          </Button>
        )}
        {isPending && (
          <Button
            isLoading
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            disabled
          >
            Signing-Up
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default SignupForm;
