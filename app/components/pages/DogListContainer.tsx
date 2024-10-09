import { useEffect } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import DogCard from "../cards/DogCard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../lib/hooks";
import { AppDispatch } from "../../lib/store";
import { fetchDogObjects } from "../../lib/features/dogSearchSlice";
import { Dog } from "@/app/typings/Dog";

const DogListContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dogs, nextPageUrl, prevPageUrl, totalCount, breeds } = useAppSelector(
    (state) => state.dogSearch
  );

  const handleFetchDogsWithDetails = (nextUrl?: string) => {
    dispatch(fetchDogObjects({ breeds: breeds, nextUrl }));
  };

  const handleNext = () => {
    if (nextPageUrl) {
      handleFetchDogsWithDetails(nextPageUrl);
    }
  };

  const handlePrevious = () => {
    if (prevPageUrl) {
      handleFetchDogsWithDetails(prevPageUrl);
    }
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
