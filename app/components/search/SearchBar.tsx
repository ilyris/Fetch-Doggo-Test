import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { fetchDogBreedData } from "@/app/helpers/fetchDogBreedData";
import theme from "@/app/theme";
import { WhiteTextField } from "../styledComponents/WhiteTextField";
import {
  WhiteInputLabel,
  WhiteSelectList,
} from "../styledComponents/WhiteSelectList";
import { fetchDogsId } from "@/app/helpers/fetchDogsId";
import { fetchDogsByIds } from "@/app/helpers/fetchDogsByIds";

const SearchBar = () => {
  const [userSelectedbreeds, setUserSelectedBreeds] = useState<string[]>([]);
  const [breedsData, setBreedsData] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<number | null>(null);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);

  const handleZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(Number(e.target.value));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "minAge") {
      setMinAge(Number(value));
    } else if (name === "maxAge") {
      setMaxAge(Number(value));
    }
  };

  // Handle multiple select changes
  const handleSelectChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setUserSelectedBreeds(typeof value === "string" ? value.split(",") : value);
  };

  // const handleSearch = async () => {
  //   const dogIds = await fetchDogsId({
  //     breeds: userSelectedbreeds,
  //     zipCode: Number(zipCode),
  //     minAge: Number(minAge),
  //     maxAge: Number(maxAge),
  //   });
  //   const dogsData = await fetchDogsByIds(dogIds.resultIds);
  //   console.log({ dogsData });
  // };

  useEffect(() => {
    (async () => {
      const breeds = await fetchDogBreedData();
      setBreedsData(breeds);
    })();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
      }}
    >
      <FormControl fullWidth>
        <WhiteInputLabel id="demo-simple-select-label">Breed</WhiteInputLabel>
        <WhiteSelectList
          multiple
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userSelectedbreeds}
          onChange={handleSelectChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          variant={"standard"}
        >
          <MenuItem
            value=""
            disabled
            sx={{ color: theme.palette.background.default }}
          >
            <em>Please select a breed</em>
          </MenuItem>
          {!!breedsData?.length &&
            breedsData.map((breed) => (
              <MenuItem
                sx={{ color: theme.palette.background.default }}
                key={breed}
                value={breed}
              >
                {breed}
              </MenuItem>
            ))}
        </WhiteSelectList>
      </FormControl>
      <FormControl fullWidth>
        <WhiteTextField
          label="zip code"
          placeholder="zip code"
          value={!!zipCode ? zipCode : ""}
          onChange={handleZipCode}
        />
      </FormControl>
      <FormControl fullWidth>
        <WhiteTextField
          label="min age"
          name="minAge"
          placeholder="min age"
          value={!!minAge ? minAge : ""}
          onChange={handleAgeChange}
        />
      </FormControl>
      <FormControl fullWidth>
        <WhiteTextField
          label="max age"
          name="maxAge"
          placeholder="max age"
          value={!!maxAge ? maxAge : ""}
          onChange={handleAgeChange}
        />
      </FormControl>
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
