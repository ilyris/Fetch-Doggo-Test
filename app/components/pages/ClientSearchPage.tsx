"use client";
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../navigation/Navbar";
import SearchBar from "../search/SearchBar";
import DogListContainer from "./DogListContainer";
import FavoritesHeader from "../FavoritesHeader";
import BreedSortSelect from "../sort/BreedSortSelect";
import { useAppDispatch } from "@/app/lib/hooks";
import { useEffect } from "react";
import { fetchDogBreeds } from "@/app/lib/features/dogSearchSlice";

const ClientSearchPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDogBreeds());
  }, []);

  return (
    <Container>
      <Navbar isUserLoggedIn={true} />
      <Box mt={5}>
        <Typography mb={4} variant="h4">
          Search For Your Dog!
        </Typography>
        <SearchBar />
      </Box>
      <Box mt={5}>
        <BreedSortSelect />
      </Box>
      <FavoritesHeader />
      <DogListContainer />
    </Container>
  );
};

export default ClientSearchPage;
