import axios from "axios";

// gets dog objects
export const fetchDogs = async () => {
  const response = await axios.post(
    "https://frontend-take-home-service.fetch.com/dogs",
    // This is the request body, should not be wrapped inside another 'body' object
    ["VXGFTIcBOvEgQ5OCx40W", "dHGFTIcBOvEgQ5OCx40W", "uHGFTIcBOvEgQ5OCx40W"],
    {
      withCredentials: true, // Ensures cookies are sent if needed
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 200) return response.data;
  console.log({ response });
};
