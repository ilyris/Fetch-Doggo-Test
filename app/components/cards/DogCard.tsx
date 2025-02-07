import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useAppDispatch } from "@/app/lib/hooks";
import { addToFavorites } from "@/app/lib/features/dogMatchesSlice";
import { Dog } from "@/app/typings/Dog";

interface DogCardProps extends Dog {
  showFavoriteButton?: boolean;
}
const DogCard: React.FC<DogCardProps> = ({
  img,
  name,
  age,
  zip_code,
  breed,
  id,
  showFavoriteButton = true,
}) => {
  const dispatch = useAppDispatch();

  const handleFavoriteDogAddition = () => {
    dispatch(addToFavorites({ img, name, age, zip_code, breed, id }));
  };

  return (
    <Card sx={{ flex: "0 1 auto", position: "relative" }}>
      <CardMedia sx={{ height: 140 }} image={img} title={name} />
      <CardContent>
        <Typography variant="h6">Name: {name}</Typography>
        <Typography variant="h6">Age: {age}</Typography>
        <Typography variant="h6">Zip Code: {zip_code}</Typography>
        <Typography variant="h6">Breed: {breed}</Typography>
        {showFavoriteButton && (
          <Button
            sx={{
              position: "absolute",
              top: 0,
              right: 15,
            }}
            onClick={handleFavoriteDogAddition}
          >
            <StarIcon
              sx={{
                fontSize: 36,
                color: "#2e7d32",
                cursor: "pointer",
                "&:hover": {
                  color: "#809D3C",
                },
              }}
            />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DogCard;
