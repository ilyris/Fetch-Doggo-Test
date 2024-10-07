import axios from "axios";

// gets dog breeds
export const fetchDogBreedData = async () => {
  const response = await axios.get(
    "https://frontend-take-home-service.fetch.com/dogs/breeds",
    {
      withCredentials: true, // Ensure this is in the right place
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 200) return response.data;
};
