"use client";
import { Box } from "@mui/material";
import LoginForm from "./Login";
import axios from "axios";
import { LoginData } from "@/app/typings/Login";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
import Alert from "@mui/material/Alert";
import { useState } from "react";

export default function LoginClient() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (loginData: LoginData) => {
    const { name, email } = loginData;

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { name, email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) router.push("/search");
    } catch (err) {
      setAlertMessage("Failed to login, please use a valid name and/or email");
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LoginForm handleLoginFormCb={handleSubmit} />
      {alertMessage && (
        <Alert severity="error" sx={{ mt: 4 }}>
          {alertMessage}
        </Alert>
      )}
    </Box>
  );
}
