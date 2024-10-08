import { BASE_URL } from "@/config";
import axios from "axios";

// get dog objects
export const fetchDogsByIds = async (favoriteDogIds: string[]) => {
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
  if (response.status === 200) return response.data.match;
  console.log({ response });
};
