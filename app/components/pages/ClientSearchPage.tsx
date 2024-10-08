"use client";
import { Button, Container, Typography } from "@mui/material";
import Navbar from "../navigation/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../search/SearchBar";
import DogListContainer from "../DogListContainer";

const ClientSearchPage = () => {
  return (
    <Container>
      <Navbar isUserLoggedIn={true} />
      <Typography mb={4} variant="h4">
        Searching for your dog!
      </Typography>
      <SearchBar />
      <DogListContainer />
    </Container>
  );
};

export default ClientSearchPage;
