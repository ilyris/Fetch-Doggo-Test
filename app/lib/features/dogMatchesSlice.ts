"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/config";
import { Dog } from "@/app/typings/Dog";

interface Match {
  match: string;
}

export interface DogMatchesState {
  favoritesCount: number;
  favorites: Dog[];
  matchedDogId: Match | null;
  matchedDog: Dog | null;
}

const initialState: DogMatchesState = {
  favoritesCount: 0,
  favorites: [],
  matchedDogId: null,
  matchedDog: null,
};

// Async thunk to fetch data (or any API call)
export const fetchMatchedDog = createAsyncThunk(
  "dogMatches/matchedDogAsyncThunk",
  async (favoriteDogIds: string[]) => {
    const response = await axios.post(
      `${BASE_URL}/dogs/match`,
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
      state.matchedDogId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchedDog.fulfilled, (state, action) => {
      state.matchedDogId = action.payload;
      state.matchedDog =
        state.favorites.find((dog) => dog.id === action.payload) || null;
    });
  },
});

export const { addToFavorites, clearFavorites, clearDog } =
  DogMatchesSlice.actions;
export default DogMatchesSlice.reducer;
