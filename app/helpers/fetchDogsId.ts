import axios from "axios";
// Query Parameters
// The following query parameters can be supplied to filter the search results. All are optional; if none are provided, the search will match all dogs.

// breeds - an array of breeds
// zipCodes - an array of zip codes
// ageMin - a minimum age
// ageMax - a maximum age
// Additionally, the following query parameters can be used to configure the search:

// size - the number of results to return; defaults to 25 if omitted
// from - a cursor to be used when paginating results (optional)
// sort - the field by which to sort results, and the direction of the sort; in the format sort=field:[asc|desc].
// results can be sorted by the following fields:
// breed
// name
// age
// Ex: sort=breed:asc
export const fetchDogsId = async ({
  breeds,
  zipCode,
  minAge,
  maxAge,
}: DogSearch) => {
  debugger;
  const r = await axios.get(
    "https://frontend-take-home-service.fetch.com/dogs/search",
    {
      params: { breeds, zipCode, minAge, maxAge },
      withCredentials: true,
    }
  );
  console.log({ r });
  if ((r.status = 2000)) return r.data;
};
