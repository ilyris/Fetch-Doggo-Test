"use client";
import DogCard from "@/app/components/cards/DogCard";
import MainStyledLink from "@/app/components/navigation/MainStyledLink";
import { useAppSelector } from "@/app/lib/hooks";
import { Box, Container, Typography } from "@mui/material";

export default function MatchPage() {
  const matchedDog = useAppSelector((state) => state.dogMatches.matchedDog);

  return (
    <Container>
      <Typography mb={4} variant="h1">
        Congratulations! <i>{matchedDog?.name}</i> is your matched doggo!
      </Typography>
      <Box>
        <MainStyledLink href={"/search"} sx={{ float: "right" }}>
          Search Doggos
        </MainStyledLink>
      </Box>
      {!!matchedDog ? (
        <Box display="flex" justifyContent={"center"}>
          <Box width={250}>
            <DogCard
              key={matchedDog.id}
              {...matchedDog}
              showFavoriteButton={false}
            />
          </Box>
        </Box>
      ) : (
        <Typography mb={4} variant="h6">
          Match Not Found
        </Typography>
      )}
    </Container>
  );
}
