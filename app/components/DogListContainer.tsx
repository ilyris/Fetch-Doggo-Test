import { useEffect, useState } from "react";
import { fetchDogBreedData } from "../helpers/fetchDogBreedData";
import { Container, Typography } from "@mui/material";
import { fetchDogsId } from "../helpers/fetchDogsId";
import { fetchDogsByIds } from "../helpers/fetchDogsByIds";
import DogCard from "./cards/DogCard";

const DogListContainer = () => {
  const [breedsData, setBreedsData] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const breeds = await fetchDogBreedData();
        setBreedsData(breeds);

        if (breeds?.length) {
          const dogIds = await fetchDogsId({
            breeds: ["Pug", "German Shepherd"],
            zipCode: 80920,
            minAge: 1,
            maxAge: 5,
          });
          console.log({ dogIds });
          if (dogIds?.length) {
            const dogsData = await fetchDogsByIds(dogIds);
            console.log({ dogsData });
            setDogs(dogsData);
          }
        }
      } catch (error) {
        console.error("Error fetching dog data:", error);
      }
    };

    fetchDogData();
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
      {breedsData.length > 0 ? (
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
