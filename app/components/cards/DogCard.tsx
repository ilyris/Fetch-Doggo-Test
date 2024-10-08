import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const DogCard: React.FC<Dog> = ({ img, name, age, zip_code, breed }) => {
  return (
    <Card sx={{ flex: "0 1 auto", position: "relative" }}>
      <CardMedia sx={{ height: 140 }} image={img} title={name} />
      <CardContent>
        <Typography variant="h6">Name: {name}</Typography>
        <Typography variant="h6">Age: {age}</Typography>
        <Typography variant="h6">Zip Code: {zip_code}</Typography>
        <Typography variant="h6">Breed: {breed}</Typography>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 15,
          }}
          onClick={() => console.log("do shit")}
        >
          <StarIcon
            sx={{
              fontSize: 36,
              color: "#5472D3",
              cursor: "pointer",
              "&:hover": {
                color: "#1E88E5",
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DogCard;
