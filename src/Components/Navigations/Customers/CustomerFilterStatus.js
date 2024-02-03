import * as React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import {
  useCustomersLoadingStore,
  useCustomersStore,
} from "Components/Assets/StateManagement";
import axios from "axios";
import { getCookie } from "Components/Assets/UIServices";
import { customers } from "Components/Assets/DummyData";

// API endpoints
const allCustomersUrl =
  process.env.REACT_APP_BASE_URL +
  process.env.REACT_APP_GET_CUSTOMERS_LIST_URL_SUPERADMIN;
export default function CustomerFilterStatus({ counts, setCustomers }) {
  const [value, setValue] = React.useState(0);

  // Custom hook 'useCustomersStore' to access and update 'isOrderLoading' state
  const setIsCustomersLoading = useCustomersStore(
    (state) => state.setIsCustomersLoading
  );

  const setInitialCustomersList = useCustomersStore(
    (state) => state.setInitialCustomersList
  );
  const setFilteredCustomersList = useCustomersStore(
    (state) => state.setFilteredCustomersList
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllCustomers = async () => {
    await setIsCustomersLoading();

    try {
      // const response = await axios.post(
      //   allCustomersUrl,
      //   {
      //     username: getCookie("email"),
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${getCookie("ud")}`,
      //     },
      //   }
      // );
      // await setInitialCustomersList(response.data);
      await setInitialCustomersList(customers);
    } catch (error) {
      console.log(error);
    }

    await setIsCustomersLoading();
  };

  // useEffect hook to set initial orders when the component is mounted
  React.useEffect(() => {
    //To retrieve data through API
    getAllCustomers();
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
        }}
      >
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Filter Customer Status"
          sx={{ overflow: "auto" }}
        >
          <Tab
            label={`All (${counts.All})`}
            onClick={() => setFilteredCustomersList("All")}
          />
          <Tab
            label={`Active (${counts.Active})`}
            onClick={() => setFilteredCustomersList("Active")}
          />
          <Tab
            label={`Block (${counts.Block})`}
            onClick={() => setFilteredCustomersList("Block")}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
