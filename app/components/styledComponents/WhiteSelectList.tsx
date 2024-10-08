import styled from "@emotion/styled";
import { InputLabel, Select } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const WhiteSelectList = styled(Select)<{ theme: Theme }>(
  ({ theme }) => ({
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
      color: theme.palette.text.primary,
    },
    "& .MuiListItem-root.Mui-selected": {
      color: theme.palette.text.primary,
    },
  })
);

// Styled InputLabel component to ensure label color stays white
export const WhiteInputLabel = styled(InputLabel)<{ theme: Theme }>(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    "&.Mui-focused": {
      color: theme.palette.text.primary,
    },
  })
);
