import axios from "axios";
import { BASE_URL } from "@/config";

export const fetchDogsId = async ({
  breeds,
  zipCode,
  minAge,
  maxAge,
  nextUrl, // Optional next URL for pagination
}: DogSearch & { nextUrl?: string }) => {
  try {
    let url = `${BASE_URL}/dogs/search`; // Default URL for the initial fetch

    if (nextUrl) {
      url = nextUrl.startsWith("http") ? nextUrl : `${BASE_URL}${nextUrl}`;
    }

    const params = nextUrl
      ? {} // No need to pass params if nextUrl exists (it's already a complete URL)
      : {
          breeds,
          zipCode,
          minAge,
          maxAge,
          size: 25,
        };

    const r = await axios.get(url, {
      params: nextUrl ? undefined : params,
      withCredentials: true,
    });

    if (r.status === 200) return r.data;
  } catch (error) {
    console.error("Error fetching dog IDs:", error);
  }
};
