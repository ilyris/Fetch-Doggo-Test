import { useCallback, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import DogCard from "../cards/DogCard";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { AppDispatch } from "../../lib/store";
import { fetchDogObjects } from "../../lib/features/dogSearchSlice";
import { Dog } from "@/app/typings/Dog";

const DogListContainer = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { dogs, breeds, userSelectedBreeds } = useAppSelector(
    (state) => state.dogSearch
  );

  const handleFetchDogsWithDetails = useCallback(() => {
    dispatch(fetchDogObjects({ breeds: userSelectedBreeds || breeds }));
  }, [dispatch, userSelectedBreeds, breeds]);

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
