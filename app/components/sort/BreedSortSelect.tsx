import { FormControl, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  WhiteInputLabel,
  WhiteSelectList,
} from "../styledComponents/WhiteSelectList";
import theme from "@/app/theme";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchDogObjects, setSort } from "@/app/lib/features/dogSearchSlice";

const BreedSortSelect = () => {
  const dispatch = useAppDispatch();
  const userSelectedBreeds = useAppSelector(
    (state) => state.dogSearch.userSelectedBreeds
  );
  const sort = useAppSelector((state) => state.dogSearch.sort);

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setSort(event.target.value as string));
    dispatch(
      fetchDogObjects({
        breeds: !!userSelectedBreeds.length ? userSelectedBreeds : undefined,
        sort: event.target.value as string,
      })
    );
  };

  return (
    <FormControl>
      <WhiteInputLabel id="sort-label" theme={theme}>
        Sort by Breed
      </WhiteInputLabel>
      <WhiteSelectList
        theme={theme}
        labelId="sort-label"
        id="sort-label"
        value={sort}
        onChange={handleSelectChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
        variant="standard"
      >
        <MenuItem
          sx={{ color: theme.palette.background.default }}
          key="asc"
          value="asc"
        >
          Ascending
        </MenuItem>
        <MenuItem
          sx={{ color: theme.palette.background.default }}
          key="desc"
          value="desc"
        >
          Descending
        </MenuItem>
      </WhiteSelectList>
    </FormControl>
  );
};

export default BreedSortSelect;
