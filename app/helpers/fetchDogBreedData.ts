import axios from "axios";
import { BASE_URL } from "@/config";

// gets dog breeds
export const fetchDogBreedData = async () => {
  const response = await axios.get(`${BASE_URL}/dogs/breeds`, {
    withCredentials: true, // Ensure this is in the right place
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) return response.data;
};
