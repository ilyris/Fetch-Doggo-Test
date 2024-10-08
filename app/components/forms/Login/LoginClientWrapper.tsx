"use client";
import { Container, Box } from "@mui/material";
import LoginForm from "./Login";
import axios from "axios";
import { LoginData } from "@/app/typings/Login";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
export default function LoginClient() {
  const router = useRouter();
  const handleSubmit = async (loginData: LoginData) => {
    const { name, email } = loginData;
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
    console.log({ response });
    if (response.status === 200) router.push("/search");
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
    </Box>
  );
}
