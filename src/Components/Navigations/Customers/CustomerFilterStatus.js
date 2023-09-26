import * as React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useCustomersLoadingStore } from "Components/Assets/StateManagement";
import { getCustomers } from "Components/Assets/UIServices";



export default function CustomerFilterStatus ({ counts, setCustomers }) {
  
    const [value, setValue] = React.useState(0);
    
    const setIsCustomersLoading = useCustomersLoadingStore(
        (state) => state.setIsCustomersLoading
    );

    const isCustomerLoading = useCustomersLoadingStore((state) => state.isCustomerLoading);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const load = async () => {
        await setIsCustomersLoading();
        await setTimeout(function () {
          setCustomers(getCustomers("All"));
          setIsCustomersLoading();
        }, 1000);
      };

      React.useEffect(() => {
        load();
      }, []);

    return (
        <Box sx={{ width: "100%", mt: 1 }}>
            <Box sx={{
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
        <Tab label={`All (${counts.All})`}
        onClick={() => setCustomers(getCustomers("All"))} 
        />
        <Tab 
        label={`Active (${counts.Active})`} 
        onClick={() => setCustomers(getCustomers("Active"))}
        />
        <Tab 
        label={`Block (${counts.Block})`} 
        onClick={() => setCustomers(getCustomers("Block"))} 
        />

        </Tabs>
        </Box>
        </Box>
        
    );  
}