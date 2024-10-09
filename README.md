This was booted up as a NextJs, this project doesn't really utilize SSR components, but I prefer Next-app > CRA

Here are links provided with some tech I used in this project. I will throw out the overall documentation for the technology, instead of individual links to each MUI component for instance.

**Project Tech**
- MUI: https://mui.com/material-ui/getting-started/
- Redux-Toolkit: https://redux-toolkit.js.org/introduction/getting-started
- NextJS: https://nextjs.org/docs/getting-started/installation
- RTK Thunks: https://redux-toolkit.js.org/api/createAsyncThunk
- Axios: https://axios-http.com/docs/intro.
- React: https://react.dev/

**Some things I have considered on this project**
- One: configured axios instance calls.
- Two: more optimized and cleaner UI Search bar.
- Three: More redux state cleanup -- I could / should move the Search state into it's own file, having three slices (form state, userSelectedBreeds).
- Four: Location based dog search, considering most users probably want to travel within 100 miles to find their matched dog to adopt. I was thinking of implementing a location search and adding a "miles" to the search functionality.


**To run the build locally**
- Git Clone <git_repo>
- Boot up your prefered IDE
- Run: "Npm i" within the projects root directory
- Run: "Npm run dev" to boot up the Next application on localhost:3000 (unles that port is in use while you're working).
