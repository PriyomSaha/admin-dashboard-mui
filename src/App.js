// Import CSS styles for datepicker, phone input, and custom app styles
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/bootstrap.css";
import "Components/UI/app.css";

// Import necessary components and styles from Material-UI
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "Components/UI/themes";
import { CssBaseline } from "@mui/material";
import ScrollTop from "Components/ScrollTop";
import ThemeRoutes from "Routes";
import { useLocation } from "react-router-dom";

// Import custom state management hook
import { useAccountStore } from "Components/Assets/StateManagement";
import { useEffect } from "react";
import { hasPermissions } from "Components/Assets/UIServices";

function App() {
  // The App component is the root component of the application.
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies global CSS baseline styles */}
      <div className="App">
        {/* The ScrollTop component scrolls to the top of the page when the route changes */}
        <ScrollTop>
          {/* The ThemeRoutes component handles rendering of different routes */}
          <ThemeRoutes />
        </ScrollTop>
      </div>
    </ThemeProvider>
  );
}

// Export the App component as the default export
export default App;
