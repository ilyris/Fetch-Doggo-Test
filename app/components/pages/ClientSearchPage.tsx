"use client";
import { Container, Typography } from "@mui/material";
import Navbar from "../navigation/Navbar";
import SearchBar from "../search/SearchBar";
import DogListContainer from "../DogListContainer";
import FavoritesHeader from "../FavoritesHeader";

const ClientSearchPage = () => {
  return (
    <Container>
      <Navbar isUserLoggedIn={true} />
      <Typography mb={4} variant="h4">
        Searching for your dog!
      </Typography>
      <SearchBar />
      <FavoritesHeader />
      <DogListContainer />
    </Container>
  );
};

export default ClientSearchPage;
