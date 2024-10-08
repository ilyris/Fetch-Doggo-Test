interface DogSearch {
  breeds: string[]; // Array of breeds (assuming it's an array of strings)
  url?: string;
  zipCode?: number; // The zip code as a number
  minAge?: number; // Minimum age
  maxAge?: number; // Maximum age
}
