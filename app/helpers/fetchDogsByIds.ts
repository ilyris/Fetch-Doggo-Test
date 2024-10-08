import axios from "axios";

// get dog objects
export const fetchDogsByIds = async (dogIds: string[]) => {
  const response = await axios.post(
    "https://frontend-take-home-service.fetch.com/dogs",
    [...dogIds],
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 200) return response.data;
  console.log({ response });
};
