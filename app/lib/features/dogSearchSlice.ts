"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/config";

interface SearchParamsState {
  breeds: string[];
  zipCode: number | null;
  minAge: number | null;
  maxAge: number | null;
}

export interface SearchFormState {
  dogIds: string[];
  dogs: Dog[];
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  totalCount: number | null;
  breeds: string[];
  zipCode: number | null;
  minAge: number | null;
  maxAge: number | null;
}

const initialState: SearchFormState = {
  dogIds: [],
  dogs: [],
  nextPageUrl: null,
  prevPageUrl: null,
  totalCount: null,
  breeds: [],
  zipCode: null,
  minAge: null,
  maxAge: null,
};

export const fetchDogsByBreed = createAsyncThunk(
  "searchForm/filteredBreedsAsyncThunk",
  async ({
    breeds,
    zipCode,
    minAge,
    maxAge,
    nextUrl,
  }: DogSearch & { nextUrl?: string }) => {
    let url = `${BASE_URL}/dogs/search`;
    if (nextUrl) {
      url = nextUrl.startsWith("http") ? nextUrl : `${BASE_URL}${nextUrl}`;
    }

    const params = nextUrl
      ? {}
      : {
          breeds,
          zipCode,
          ageMin: minAge,
          ageMax: maxAge,
        };

    const response = await axios.get(url, {
      params: nextUrl ? undefined : params,
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
  async (searchParams: DogSearch, { dispatch }) => {
    const result = await dispatch(fetchDogsByBreed(searchParams)).unwrap();
    const dogIds = result.dogIds;
    const response = await axios.post(`${BASE_URL}/dogs`, [...dogIds], {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      dogs: response.data,
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
      state.breeds = action.payload;
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
    clearDogs: (state) => {
      state.dogs = [];
    },
  },
  extraReducers: (builder) => {
    // Handle fetchMatchedDog state (only IDs and pagination)
    builder.addCase(fetchDogsByBreed.fulfilled, (state, action) => {
      state.dogIds = action.payload.dogIds;
      state.nextPageUrl = action.payload.nextPageUrl;
      state.prevPageUrl = action.payload.prevPageUrl;
      state.totalCount = action.payload.totalCount;
    });

    // Handle fetchMatchedDogsWithDetails state (IDs, dog details, pagination)
    builder.addCase(fetchDogObjects.pending, (state) => {});
    builder.addCase(fetchDogObjects.fulfilled, (state, action) => {
      state.dogs = action.payload.dogs;
      state.dogIds = action.payload.dogs.map((dog: Dog) => dog.id); // IDs extracted from the dogs
      state.nextPageUrl = action.payload.nextPageUrl;
      state.prevPageUrl = action.payload.prevPageUrl;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(fetchDogObjects.rejected, (state) => {});
  },
});

export const {
  clearDogs,
  setUserSelectedBreeds,
  setZipCode,
  setMinAge,
  setMaxAge,
} = DogsSlice.actions;
export default DogsSlice.reducer;
