import styled from "@emotion/styled";
import { TextField, Theme } from "@mui/material";

export const WhiteTextField = styled(TextField)<{ theme: Theme }>(
  ({ theme }) => ({
    "& label": {
      color: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-root": {
      color: theme.palette.text.primary,
      borderColor: theme.palette.text.primary,
      "& fieldset": {
        borderColor: theme.palette.text.primary,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.primary,
      },
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: theme.palette.text.primary,
    },
    "& .MuiInputLabel-shrink": {
      color: "#FBF5E5",
    },
  })
);
