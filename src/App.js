import { Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/bootstrap.css";
import "Components/UI/app.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "Components/UI/themes";
import { CssBaseline } from "@mui/material";
import ScrollTop from "Components/ScrollTop";
import ThemeRoutes from "Routes";
import { useEffect } from "react";
import { useAccountStore } from "Components/Assets/StateManagement";

function App() {
  // require("dotenv").config();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ScrollTop>
          <ThemeRoutes />
        </ScrollTop>
      </div>
    </ThemeProvider>
  );
}

export default App;
