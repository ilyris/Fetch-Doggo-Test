import styled from "@emotion/styled";
import { InputLabel, Select } from "@mui/material";

export const WhiteSelectList = styled(Select)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiSelect-root": {
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.text.primary, // Change the color of the dropdown arrow
  },
  "& .MuiListItem-root.Mui-selected": {
    color: theme.palette.text.primary, // Change the color of selected option
  },
}));

// Styled InputLabel component to ensure label color stays white
export const WhiteInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&.Mui-focused": {
    color: theme.palette.text.primary, // Ensure the label stays white when focused
  },
}));
