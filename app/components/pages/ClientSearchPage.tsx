"use client";
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../navigation/Navbar";
import SearchBar from "../search/SearchBar";
import DogListContainer from "./DogListContainer";
import FavoritesHeader from "../FavoritesHeader";
import BreedSortSelect from "../sort/BreedSortSelect";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import {
  fetchDogBreeds,
  fetchDogObjects,
} from "@/app/lib/features/dogSearchSlice";
import { AppDispatch } from "@/app/lib/store";
import PaginationComponent from "../pagination/Pagination";

const pageSize = 25; // Number of dogs per page

const ClientSearchPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const {
    dogs,
    totalCount,
    breeds,
    userSelectedBreeds,
    zipCode,
    minAge,
    maxAge,
  } = useAppSelector((state) => state.dogSearch);

  const [pageNumber, setPageNumber] = useState(1);

  const handlePaginationChange = (
    _: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPageNumber(newPage);
    dispatch(
      fetchDogObjects({
        breeds: userSelectedBreeds || breeds,
        pageNumber: newPage,
        zipCode: zipCode ?? undefined,
        minAge: minAge ?? undefined,
        maxAge: maxAge ?? undefined,
      })
    );
  };

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
      {!!totalCount && !!dogs?.length && (
        <Box display={"flex"} justifyContent={"center"} width={"100%"} mt={4}>
          <PaginationComponent
            pageSize={pageSize}
            totalCount={totalCount}
            page={pageNumber}
            onPageChange={handlePaginationChange}
          />
        </Box>
      )}
    </Container>
  );
};

export default ClientSearchPage;
