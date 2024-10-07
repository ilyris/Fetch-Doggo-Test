import Container from "@mui/material/Container";
import LoginClientWrapper from "./components/forms/Login/LoginClientWrapper";

export default function Home() {
  return (
    <div>
      <Container component="main">
        <LoginClientWrapper />
      </Container>
    </div>
  );
}
