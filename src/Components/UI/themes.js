import { createTheme } from "@mui/material/styles";
import {} from "@mui/material/colors";

const defaultTheme = createTheme();

// Function 'calculateFontSize' to calculate the font size based on the current screen width
export const calculateFontSize = () => {
  // Get the width of the window (screen width)
  const screenWidth = window.innerWidth;
  // Determine the font size based on different screen widths
  if (screenWidth <= 295) {
    return "10px"; // If the screen width is less than or equal to 295px, return 10px font size
  } else if (screenWidth <= 600) {
    return "12px"; // If the screen width is less than or equal to 600px, return 12px font size
  } else if (screenWidth <= 960) {
    return "14px"; // If the screen width is less than or equal to 960px, return 14px font size
  } else {
    return "16px"; // If the screen width is greater than 960px, return 16px font size
  }
};

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
      styleOverrides: {
        root: {
          fontSize: calculateFontSize(),
          textTransform: "capitalize",
        },
      },
      variants: [
        {
          props: { variant: "contained-dark" },
          style: {
            background: `${defaultTheme.palette.grey[900]}`,
            color: `${defaultTheme.palette.grey[100]}`,
            fontSize: calculateFontSize(),
            textTransform: "capitalize",
            "&:disabled": {
              background: `${defaultTheme.palette.grey[800]}`,
              color: `${defaultTheme.palette.grey[100]}`,
              pointerEvents: "none",
            },
          },
        },
        {
          props: { variant: "outlined-dark" },
          style: {
            background: "transparent",
            border: `1px solid ${defaultTheme.palette.grey[900]}`,
            color: `${defaultTheme.palette.grey[900]}`,
            fontSize: calculateFontSize(),
            textTransform: "capitalize",
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          alignSelf: "center",
        },
      },
    },
  },
});
