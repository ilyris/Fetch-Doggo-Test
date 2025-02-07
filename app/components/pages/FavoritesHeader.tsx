import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  clearFavorites,
  fetchMatchedDog,
} from "../../lib/features/dogMatchesSlice";
import { useRouter } from "next/navigation";

const FavoritesHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.dogMatches.favorites);
  const favoritesCount = useAppSelector(
    (state) => state.dogMatches.favoritesCount
  );
  const favoriteDogIds = favorites.map((doggo) => doggo.id);

  const handleDogMatchRedirect = async () => {
    const resultAction = await dispatch(fetchMatchedDog(favoriteDogIds));

    if (fetchMatchedDog.fulfilled.match(resultAction)) {
      const matchedDogId = resultAction.payload;

      router.push(`/match/${matchedDogId}`);
    } else {
      console.error("Failed to fetch the matched dog.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
      <Typography variant="h6">Current Favorites: {favoritesCount}</Typography>
      <Box>
        <Button
          sx={{ mr: 5 }}
          variant="contained"
          color="success"
          onClick={() => {
            handleDogMatchRedirect();
          }}
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
