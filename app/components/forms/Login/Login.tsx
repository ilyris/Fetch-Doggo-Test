"use client";
import { Card, Box, Typography, Button, CardContent } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import theme from "../../../theme";
import { LoginData } from "@/app/typings/Login";
import { WhiteTextField } from "../../styledComponents/WhiteTextField";

interface LoginFormProps {
  handleLoginFormCb: (loginData: LoginData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLoginFormCb }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
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

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
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
            variant="outlined"
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
            variant="outlined"
            value={email}
            error={emailError}
            helperText={emailErrorMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <WhiteTextField
            theme={theme}
            sx={{ mb: 2 }}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            error={passwordError}
            helperText={passwordErrorMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
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

        <Typography>
          Don't have an account? <Link href="/">Sign up</Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
