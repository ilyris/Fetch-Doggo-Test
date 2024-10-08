import { useEffect, useState } from "react";
import { fetchDogBreedData } from "../helpers/fetchDogBreedData";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchDogsId } from "../helpers/fetchDogsId";
import { fetchDogsByIds } from "../helpers/fetchDogsByIds";
import DogCard from "./cards/DogCard";

const DogListContainer = () => {
  const [breedsData, setBreedsData] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [totalDogs, setTotalDogs] = useState<number | null>(null);

  const fetchDogs = async (url: string | null) => {
    try {
      // Call fetchDogsId with nextUrl if provided, or construct with breedsData
      const dogIds = await fetchDogsId({
        breeds: breedsData,
        // zipCode: 80920, // Example zipCode
        // minAge: 1,
        // maxAge: 10,
        nextUrl: url || undefined, // Pass nextUrl if provided, or undefined
      });

      // Update total dogs
      setTotalDogs(dogIds.total);

      if (dogIds.resultIds?.length) {
        const dogsData = await fetchDogsByIds(dogIds.resultIds);
        setDogs(dogsData);
        setNextPageUrl(dogIds.next || null); // Get the next page URL from the API response
        setPrevPageUrl(dogIds.prev || null); // Get the prev page URL from the API response
      }
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const breeds = await fetchDogBreedData();
        setBreedsData(breeds);

        // Call fetchDogs with null (or starting URL) to fetch the first set of data
        if (breeds?.length) {
          fetchDogs(null); // Assuming fetchDogsId can handle initial fetch without a URL
        }
      } catch (error) {
        console.error("Error fetching initial dog data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Handler for fetching next/previous pages
  const handleNext = () => {
    if (nextPageUrl) fetchDogs(nextPageUrl);
  };

  const handlePrevious = () => {
    if (prevPageUrl) fetchDogs(prevPageUrl);
  };

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
      {/* Render the dogs */}
      {breedsData.length > 0 ? (
        dogs?.map((data: Dog) => {
          return <DogCard key={data.id} {...data} />;
        })
      ) : (
        <Typography variant="h4">No Breeds Found</Typography>
      )}

      {/* Loading spinner or message */}

      {/* Next/Previous buttons */}
      {!!totalDogs && !!dogs?.length && (
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
