"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Match {
  match: string;
}

export interface DogMatchesState {
  favoritesCount: number;
  favorites: Dog[];
  matchedDog: Match | null;
}

const initialState: DogMatchesState = {
  favoritesCount: 0,
  favorites: [],
  matchedDog: null,
};

// Async thunk to fetch data (or any API call)
export const fetchMatchedDog = createAsyncThunk(
  "dogMatches/matchedDogAsyncThunk",
  async (favoriteDogIds: string[]) => {
    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/dogs/match",
      [...favoriteDogIds],
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.match;
  }
);

export const DogMatchesSlice = createSlice({
  name: "dogMatches",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Dog>) => {
      const dogExists = state.favorites.some(
        (dog) => dog.id === action.payload.id
      );

      if (!dogExists) {
        state.favorites.push(action.payload);
        state.favoritesCount = state.favorites.length;
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
      state.favoritesCount = 0;
    },
    clearDog: (state) => {
      state.matchedDog = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchedDog.fulfilled, (state, action) => {
      console.log(action.payload);
      state.matchedDog = action.payload;
    });
  },
});

export const { addToFavorites, clearFavorites, clearDog } =
  DogMatchesSlice.actions;
export default DogMatchesSlice.reducer;
