"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/config";
import { fetchDogBreedData } from "@/app/helpers/fetchDogBreedData";
import { fetchDogsByIds } from "@/app/helpers/fetchDogsByIds";
import { DogSearch } from "@/app/typings/DogSearch";
import { Dog } from "@/app/typings/Dog";

export interface SearchFormState {
  breeds: string[];
  dogIds: string[];
  dogs: Dog[];
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  totalCount: number | null;
  userSelectedBreeds: string[];
  zipCode: number | null;
  minAge: number | null;
  maxAge: number | null;
  sort: string;
}

const initialState: SearchFormState = {
  breeds: [],
  dogIds: [],
  dogs: [],
  nextPageUrl: null,
  prevPageUrl: null,
  totalCount: null,
  userSelectedBreeds: [],
  zipCode: null,
  minAge: null,
  maxAge: null,
  sort: "asc",
};

export const fetchDogBreeds = createAsyncThunk(
  "dogMatches/fetchDogBreeds",
  async () => {
    const breeds = await fetchDogBreedData();
    return breeds;
  }
);

export const fetchDogsByBreed = createAsyncThunk(
  "searchForm/filteredBreedsAsyncThunk",
  async (params: DogSearch = {}) => {
    const { breeds, zipCode, minAge, maxAge, nextUrl, sort } = params;

    let url = `${BASE_URL}/dogs/search`;
    if (nextUrl) {
      url = nextUrl.startsWith("http") ? nextUrl : `${BASE_URL}${nextUrl}`;
    }

    const queryParams = nextUrl
      ? {}
      : {
          breeds,
          zipCode,
          ageMin: minAge,
          ageMax: maxAge,
          sort: `breed:${sort ?? "asc"}`, // Default to "asc" if sort is not provided
        };

    const response = await axios.get(url, {
      params: nextUrl ? undefined : queryParams,
      withCredentials: true,
    });

    return {
      dogIds: response.data.resultIds,
      nextPageUrl: response.data.next || null,
      prevPageUrl: response.data.prev || null,
      totalCount: response.data.total,
    };
  }
);

export const fetchDogObjects = createAsyncThunk(
  "dogMatches/fetchMatchedDogsWithDetails",
  async (searchParams: DogSearch | undefined, { dispatch }) => {
    const result = await dispatch(
      fetchDogsByBreed(searchParams || {})
    ).unwrap();
    const dogIds = result.dogIds;
    const response = await fetchDogsByIds(dogIds);
    return {
      dogs: response,
      nextPageUrl: result.nextPageUrl,
      prevPageUrl: result.prevPageUrl,
      totalCount: result.totalCount,
    };
  }
);

const DogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    setUserSelectedBreeds: (state, action) => {
      state.userSelectedBreeds = action.payload;
    },
    setZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
    setMinAge: (state, action) => {
      state.minAge = action.payload;
    },
    setMaxAge: (state, action) => {
      state.maxAge = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    clearDogs: (state) => {
      state.dogs = [];
    },
    clearSearchForm: (state) => {
      state.maxAge = null;
      state.minAge = null;
      state.zipCode = null;
      state.sort = "asc";
      state.userSelectedBreeds = [];
    },
  },

  // Would add rejections for global error messages, pendings for loading state, fulfilled for success messages where needed.
  extraReducers: (builder) => {
    builder.addCase(
      fetchDogBreeds.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.breeds = action.payload;
      }
    );
    builder.addCase(
      fetchDogsByBreed.fulfilled,
      (
        state,
        action: PayloadAction<{
          dogIds: string[];
          nextPageUrl: string;
          prevPageUrl: string;
          totalCount: number;
        }>
      ) => {
        state.dogIds = action.payload.dogIds;
        state.nextPageUrl = action.payload.nextPageUrl;
        state.prevPageUrl = action.payload.prevPageUrl;
        state.totalCount = action.payload.totalCount;
      }
    );

    builder.addCase(fetchDogObjects.fulfilled, (state, action) => {
      state.dogs = action.payload.dogs;
      state.dogIds = action.payload.dogs.map((dog: Dog) => dog.id);
      state.nextPageUrl = action.payload.nextPageUrl;
      state.prevPageUrl = action.payload.prevPageUrl;
      state.totalCount = action.payload.totalCount;
    });
  },
});

export const {
  clearDogs,
  setUserSelectedBreeds,
  setZipCode,
  setMinAge,
  setMaxAge,
  clearSearchForm,
  setSort,
} = DogsSlice.actions;
export default DogsSlice.reducer;
