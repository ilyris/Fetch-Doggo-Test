import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  clearFavorites,
  fetchMatchedDog,
} from "../lib/features/dogMatchesSlice";
import { useRouter } from "next/navigation";

const FavoritesHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.dogMatches.favorites);
  const favoritesCount = useAppSelector(
    (state) => state.dogMatches.favoritesCount
  );
  const favoriteDogIds = favorites.map((doggo) => doggo.id);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
      <Typography variant="h6">Current Favorites: {favoritesCount}</Typography>
      <Box>
        <Button
          sx={{ mr: 5 }}
          variant="contained"
          color="success"
          onClick={() => dispatch(fetchMatchedDog(favoriteDogIds))}
        >
          Find Match
        </Button>
        <Button variant="contained" onClick={() => dispatch(clearFavorites())}>
          Clear Favorites
        </Button>
      </Box>
    </Box>
  );
};
// fetchDogsByIds
export default FavoritesHeader;
