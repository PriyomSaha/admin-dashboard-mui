import { Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "Components/UI/app.css";
import { ThemeProvider } from "@mui/material/styles";
import Orders from "Components/Navigations/Orders";
import Dashboard from "Components/Navigations/Dashboard";
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
    setUserData("0", "Priyom Saha");
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
