import { useRoutes } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";

// Function component 'ThemeRoutes' to define and use the application routes
export default function ThemeRoutes() {
  // useRoutes hook is used to define and handle application routes
  // It takes an array of route objects (MainRoutes and LoginRoutes) and returns the matched route component
  return useRoutes([MainRoutes, LoginRoutes]);
}

/**The code imports the useRoutes hook from the react-router-dom library, along with two other route-related components, LoginRoutes and MainRoutes.

The ThemeRoutes functional component is used to define and use the application routes.

The component uses the useRoutes hook, which is a utility hook provided by react-router-dom. This hook allows us to define and handle application routes based on the specified route objects.

The useRoutes hook takes an array of route objects as its argument. In this case, the array contains two route objects, MainRoutes and LoginRoutes.

MainRoutes and LoginRoutes are separate route objects that contain information about the paths and components to be rendered for the main application and login routes, respectively.

The useRoutes hook matches the current URL with the specified route paths and returns the matched route component. In this case, it will return either the main application routes or the login routes based on the current URL.

The ThemeRoutes component acts as a central point for handling and managing the application's routing logic. It allows the application to navigate between different pages or components based on the current URL, providing a seamless user experience. The specific route components, MainRoutes and LoginRoutes, define the content and layout of the respective routes.
 */
