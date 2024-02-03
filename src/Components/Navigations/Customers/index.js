import React from "react";
import { ComponentBody, ComponentHeader } from "Components/UI/GlobalStyles";
import { Stack, Typography } from "@mui/material";
import AddNewImportExportButton from "./AddNewimportExportButton";
import CustomerSearchBar from "./CustomerSearchbar";
import AddCustomerButton from "./AddCustomerButton";
import CustomerFilterStatus from "./CustomerFilterStatus";
import CustomerTable from "./CustomerTable";
import { updateCustomersCount } from "Components/Assets/UIServices";
import {
  useCustomersStore,
  useDrawerStore,
} from "Components/Assets/StateManagement";

function Customers() {
  const [customers, setCustomers] = React.useState([]);
  const [counts, setCounts] = React.useState({});

  const customerList = useCustomersStore((state) => state.customersList);

  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);

  React.useEffect(() => {
    setCounts(updateCustomersCount(customerList));
  }, [customerList]);

  return (
    <>
      <ComponentHeader isDrawerOpen={isDrawerOpen}>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap" }}
        >
          <Typography
            variant="h5"
            noWrap={true}
            sx={{
              fontWeight: "medium",
              letterSpacing: 1,
              fontSize: 25,
              textTransform: "capitalize",
            }}
          >
            Customers
          </Typography>
          <AddNewImportExportButton />
        </Stack>
      </ComponentHeader>
      <ComponentBody isDrawerOpen={isDrawerOpen}>
        <Stack direction="row" justifyContent="space-between">
          <CustomerSearchBar />
          <AddCustomerButton />
        </Stack>

        <CustomerFilterStatus counts={counts} setCustomers={setCustomers} />

        <CustomerTable customers={customers} />
      </ComponentBody>
    </>
  );
}

export default Customers;
