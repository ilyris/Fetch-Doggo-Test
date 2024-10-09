import React, { useState } from "react";
import { Box, Button, FormControl, MenuItem } from "@mui/material";
import theme from "@/app/theme";
import { WhiteTextField } from "../styledComponents/WhiteTextField";
import {
  WhiteInputLabel,
  WhiteSelectList,
} from "../styledComponents/WhiteSelectList";
import {
  clearSearchForm,
  fetchDogObjects,
  setMaxAge,
  setMinAge,
  setUserSelectedBreeds,
  setZipCode,
} from "@/app/lib/features/dogSearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { breeds, zipCode, minAge, maxAge, userSelectedBreeds } =
    useAppSelector((state) => state.dogs);

  const [localZipCode, setLocalZipCode] = useState<number | null>(null);
  const [localMinAge, setLocalMinAge] = useState<number | null>(null);
  const [localMaxAge, setLocalMaxAge] = useState<number | null>(null);

  const handleZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalZipCode(Number(e.target.value));
    dispatch(setZipCode(Number(e.target.value)));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "minAge") {
      setLocalMinAge(Number(value));
      dispatch(setMinAge(Number(value)));
    } else if (name === "maxAge") {
      setLocalMaxAge(Number(value));
      dispatch(setMaxAge(Number(value)));
    }
  };

  // Handle multiple select changes
  const handleSelectChange = (event: any) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setUserSelectedBreeds(
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  const handleSearch = async () => {
    dispatch(
      fetchDogObjects({
        breeds: userSelectedBreeds,
        zipCode: Number(zipCode),
        minAge: Number(minAge),
        maxAge: Number(maxAge),
      })
    );

    // reset local state on submit
    setLocalZipCode(null);
    setLocalMinAge(null);
    setLocalMaxAge(null);
    dispatch(clearSearchForm());
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
      }}
    >
      <FormControl fullWidth>
        <WhiteInputLabel id="demo-simple-select-label" theme={theme}>
          Breed
        </WhiteInputLabel>
        <WhiteSelectList
          theme={theme}
          multiple
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userSelectedBreeds}
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
          {!!breeds?.length &&
            breeds.map((breed) => (
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
          theme={theme}
          label="zip code"
          placeholder="zip code"
          value={!!localZipCode ? localZipCode : ""}
          onChange={handleZipCode}
        />
      </FormControl>
      <FormControl fullWidth>
        <WhiteTextField
          theme={theme}
          label="min age"
          name="minAge"
          placeholder="min age"
          value={!!localMinAge ? localMinAge : ""}
          onChange={handleAgeChange}
        />
      </FormControl>
      <FormControl fullWidth>
        <WhiteTextField
          theme={theme}
          label="max age"
          name="maxAge"
          placeholder="max age"
          value={!!localMaxAge ? localMaxAge : ""}
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
