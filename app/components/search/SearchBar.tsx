import React, { useEffect, useState } from "react";
import {
  Box,
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

const SearchBar = () => {
  const [userSelectedbreeds, setUserSelectedBreeds] = useState<string[]>([]);
  const [breedsData, setBreedsData] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState<number | null>(null);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);

  console.log({ zipCode });

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

  useEffect(() => {
    (async () => {
      const breeds = await fetchDogBreedData();
      console.log({ breeds });
      setBreedsData(breeds);
    })();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <FormControl fullWidth>
        <WhiteInputLabel id="demo-simple-select-label">Breed</WhiteInputLabel>
        <WhiteSelectList
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Breed"
          sx={{ maxWidth: 200 }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // Limit the height of the dropdown menu
              },
            },
          }}
        >
          <MenuItem value="" sx={{ color: theme.palette.background.default }}>
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
    </Box>
  );
};

export default SearchBar;
