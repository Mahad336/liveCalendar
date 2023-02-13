import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Stack,
  Icon,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { setEmailToken } from "../../../utils/handleToken";
import { loginUser } from "../../../utils/userAPI";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    const result = await loginUser(email, password);
    if (result) {
      if (result.data && result.data.errors) {
        setIsPending(false);
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
            Sign In!
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
            Signing-In
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default LoginForm;
