import { createTheme } from "@mui/material/styles";
import {} from "@mui/material/colors";

const defaultTheme = createTheme();
export const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: `"Poppins","Roboto", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: `var(--header-nav-background)`,
          color: `var(--header-nav-text)`,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained-dark" },
          style: {
            background: `${defaultTheme.palette.grey[900]}`,
            color: `${defaultTheme.palette.grey[100]}`,
          },
        },
        {
          props: { variant: "outlined-dark" },
          style: {
            background: "transparent",
            border: `1px solid ${defaultTheme.palette.grey[900]}`,
            color: `${defaultTheme.palette.grey[900]}`,
            hover: { opacity: "1" },
          },
        },
      ],
    },
  },
});
