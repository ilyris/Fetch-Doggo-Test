import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
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
  const { breeds, zipCode, minAge, maxAge, userSelectedBreeds, sort } =
    useAppSelector((state) => state.dogSearch);

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
  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setUserSelectedBreeds(
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  const handleClearForm = () => {
    dispatch(fetchDogObjects());
    dispatch(clearSearchForm());
  };

  const handleSearch = async () => {
    dispatch(
      fetchDogObjects({
        breeds: userSelectedBreeds,
        zipCode: !!zipCode ? Number(zipCode) : undefined,
        minAge: !!minAge ? Number(minAge) : undefined,
        maxAge: !!maxAge ? Number(maxAge) : undefined,
        sort,
      })
    );

    // reset local state on submit
    setLocalZipCode(null);
    setLocalMinAge(null);
    setLocalMaxAge(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 5,
      }}
    >
      <FormControl sx={{ width: "20%" }}>
        <WhiteInputLabel id="breed-search-label" theme={theme}>
          Breed
        </WhiteInputLabel>
        <WhiteSelectList
          variant="filled"
          theme={theme}
          labelId="breed-search-select-label"
          id="breed-search-select-label"
          value={userSelectedBreeds}
          onChange={handleSelectChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
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
      <FormControl>
        <WhiteTextField
          variant="filled"
          theme={theme}
          label="zip code"
          placeholder="zip code"
          value={!!localZipCode ? localZipCode : ""}
          onChange={handleZipCode}
        />
      </FormControl>
      <FormControl>
        <WhiteTextField
          variant="filled"
          theme={theme}
          label="min age"
          name="minAge"
          placeholder="min age"
          value={!!localMinAge ? localMinAge : ""}
          onChange={handleAgeChange}
          slotProps={{ htmlInput: { maxLength: 2 } }}
        />
      </FormControl>
      <FormControl>
        <WhiteTextField
          variant="filled"
          theme={theme}
          label="max age"
          name="maxAge"
          placeholder="max age"
          value={!!localMaxAge ? localMaxAge : ""}
          onChange={handleAgeChange}
          slotProps={{ htmlInput: { maxLength: 2 } }}
        />
      </FormControl>
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" onClick={handleClearForm}>
        Reset
      </Button>
    </Box>
  );
};

export default SearchBar;
