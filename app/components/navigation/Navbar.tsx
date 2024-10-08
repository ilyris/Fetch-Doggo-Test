"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import MainStyledLink from "./MainStyledLink";
import axios from "axios";
import { BASE_URL } from "@/config";

interface NavigationProps {
  isUserLoggedIn: boolean;
}
const Navigation: React.FC<NavigationProps> = ({ isUserLoggedIn }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) router.push("/");
  };

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "end",
        p: 3,
      }}
    >
      <Box>
        <Box>
          {isUserLoggedIn ? (
            <>
              <MainStyledLink
                href="#"
                component="button"
                variant="body2"
                onClick={() => {
                  handleSignOut();
                }}
              >
                Log Out
              </MainStyledLink>
            </>
          ) : (
            <>
              <MainStyledLink href="/" component="button" variant="body2">
                Login
              </MainStyledLink>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Navigation;
