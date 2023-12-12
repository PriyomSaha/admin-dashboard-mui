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

// Import custom state management hook
import { useAccountStore } from "Components/Assets/StateManagement";

function App() {
  // Use the custom state management hook to set user data
  const setUserData = useAccountStore((state) => state.setUserData);

  // Set user data with name "Priyom Saha" and a boolean value "true"
  // This is an example of using the state management hook to manage user data.
  // setUserData("Priyom Saha", "priyom1499@gmail.com", true);

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
