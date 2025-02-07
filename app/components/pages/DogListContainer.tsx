import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import DogCard from "../cards/DogCard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../lib/hooks";
import { AppDispatch } from "../../lib/store";
import { fetchDogObjects } from "../../lib/features/dogSearchSlice";
import { Dog } from "@/app/typings/Dog";

const DogListContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dogs, breeds, userSelectedBreeds } = useAppSelector(
    (state) => state.dogSearch
  );

  const handleFetchDogsWithDetails = () => {
    dispatch(fetchDogObjects({ breeds: userSelectedBreeds || breeds }));
  };

  useEffect(() => {
    handleFetchDogsWithDetails();
  }, [handleFetchDogsWithDetails]);

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 4,
        py: 4,
      }}
    >
      {dogs.length > 0 ? (
        dogs?.map((data: Dog) => {
          return <DogCard key={data.id} {...data} />;
        })
      ) : (
        <Typography variant="h4">No Breeds Found</Typography>
      )}
    </Container>
  );
};

export default DogListContainer;
