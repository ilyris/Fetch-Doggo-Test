"use client";
import { useAppSelector } from "@/app/lib/hooks";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

export default function MatchPage() {
  const matchedDog = useAppSelector((state) => state.dogMatches.matchedDog);

  return (
    <Container>
      <Typography mb={4} variant="h4">
        Your Adoption Match! {matchedDog?.name}
      </Typography>
      {!!matchedDog ? (
        <Card>
          <CardMedia
            sx={{
              aspectRatio: "16 / 9",
              width: "100%",
            }}
            image={matchedDog.img}
            title={matchedDog.name}
          />
          <CardContent>
            <Typography variant="h6">Name: {matchedDog?.name}</Typography>
            <Typography variant="h6">Age: {matchedDog?.age}</Typography>
            <Typography variant="h6">
              Zip Code: {matchedDog?.zip_code}
            </Typography>
            <Typography variant="h6">Breed: {matchedDog?.breed}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography mb={4} variant="h6">
          Match Not Found
        </Typography>
      )}
    </Container>
  );
}
