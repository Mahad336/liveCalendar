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
  Box,
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import PasswordChecklist from "react-password-checklist";
import { setEmailToken } from "../../../utils/handleToken";
import { signUpUser } from "../../../utils/userAPI";
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signUpUser(email, password, firstName, lastName);
    if (result) {
      if (result.data && result.data.errors) {
        setEmailError(result.data.errors.email);
        setPasswordError(result.data.errors.password);
      }
      if (result.user) {
        setIsPending(true);
        setEmailToken(result.email);
        navigate("/calendar");
      }
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<LockIcon />} />
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setCPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Text color="red">{passwordError}</Text>
        {!isPending && (
          <Button
            className="btn"
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
          >
            Signing-Up
          </Button>
        )}
        <FormControl isRequired>
          <Box overflow="hidden">
            <PasswordChecklist
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              className="check"
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={cPassword}
              onChange={(isValid) => {
                isValid
                  ? (document.querySelector(".btn").disabled = false)
                  : (document.querySelector(".btn").disabled = true);
              }}
            />
          </Box>
        </FormControl>
      </Stack>
    </form>
  );
};

export default SignupForm;
