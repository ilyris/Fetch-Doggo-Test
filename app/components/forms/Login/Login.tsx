"use client";
import { Card, Box, Typography, Button, CardContent } from "@mui/material";
import { useState } from "react";

import theme from "../../../theme";
import { LoginData } from "@/app/typings/Login";
import { WhiteTextField } from "../../styledComponents/WhiteTextField";

interface LoginFormProps {
  handleLoginFormCb: (loginData: LoginData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLoginFormCb }) => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const [nameError, setNameError] = useState<boolean>(false);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 400,
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <CardContent>
        <Typography variant="h3" mb={2}>
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleLoginFormCb({ name: fullName, email });
          }}
        >
          <WhiteTextField
            theme={theme}
            sx={{ mb: 2 }}
            id="name"
            required
            label="Full Name"
            variant="filled"
            value={fullName}
            error={nameError}
            helperText={nameErrorMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
          />
          <WhiteTextField
            theme={theme}
            sx={{ mb: 2 }}
            id="email"
            required
            label="Email"
            variant="filled"
            value={email}
            error={emailError}
            helperText={emailErrorMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => validateInputs()}
          >
            Login
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
