import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import DogCard from "../cards/DogCard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../lib/hooks";
import { AppDispatch } from "../../lib/store";
import { fetchDogObjects } from "../../lib/features/dogSearchSlice";
import { Dog } from "@/app/typings/Dog";
import PaginationComponent from "../pagination/Pagination";

const pageSize = 25; // Number of dogs per page

const DogListContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dogs, totalCount, breeds, userSelectedBreeds } = useAppSelector(
    (state) => state.dogSearch
  );
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
      })
    );
  };

  const handleFetchDogsWithDetails = () => {
    dispatch(fetchDogObjects({ breeds: breeds }));
  };

  useEffect(() => {
    handleFetchDogsWithDetails();
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

export default DogListContainer;
