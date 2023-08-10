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
  /* Manage User Data  */
  const setUserData = useAccountStore((state) => state.setUserData);

  useEffect(() => {
    setUserData("0", "Priyom Saha", "00011133324", true);
  }, []);

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
