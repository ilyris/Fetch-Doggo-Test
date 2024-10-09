import { configureStore } from "@reduxjs/toolkit";
import dogMatchesSlice from "./features/dogMatchesSlice";
import dogSearchSlice from "./features/dogSearchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      dogMatches: dogMatchesSlice,
      dogs: dogSearchSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
