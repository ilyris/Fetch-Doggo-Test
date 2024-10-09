import { useEffect, useState } from "react";
import { fetchDogBreedData } from "../helpers/fetchDogBreedData";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchDogsId } from "../helpers/fetchDogsId";
import { fetchDogsByIds } from "../helpers/fetchDogsByIds";
import DogCard from "./cards/DogCard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../lib/hooks";
import { AppDispatch } from "../lib/store";
import {
  fetchDogObjects,
  fetchDogsByBreed,
} from "../lib/features/dogSearchSlice";

const DogListContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const [breedsData, setBreedsData] = useState<string[]>([]);
  const { dogIds, dogs, nextPageUrl, prevPageUrl, totalCount, breeds } =
    useAppSelector((state) => state.dogs);

  const fetchBreeds = async () => {
    try {
      const initialBreeds = await fetchDogBreedData();
      setBreedsData(initialBreeds);
      handleFetchDogsWithDetails();
    } catch (error) {
      console.error("Error fetching initial dog data:", error);
    }
  };

  const handleFetchDogsWithDetails = (nextUrl?: string) => {
    const selectedBreeds = !!breeds.length ? breeds : breedsData;
    dispatch(fetchDogObjects({ breeds: selectedBreeds, nextUrl }));
  };

  // Handle next page
  const handleNext = () => {
    if (nextPageUrl) {
      handleFetchDogsWithDetails(nextPageUrl);
    }
  };

  // Handle previous page
  const handlePrevious = () => {
    if (prevPageUrl) {
      handleFetchDogsWithDetails(prevPageUrl);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

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

      {!!totalCount && !!dogs?.length && (
        <Box display={"flex"} justifyContent={"center"} width={"100%"} mt={4}>
          <Button
            variant="contained"
            onClick={handlePrevious}
            disabled={!prevPageUrl}
            sx={{ marginRight: 2 }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!nextPageUrl}
          >
            Next
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default DogListContainer;
