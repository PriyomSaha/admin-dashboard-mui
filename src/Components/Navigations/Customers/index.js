import React from 'react'
import { ComponentBody, ComponentHeader } from 'Components/Assets/GlobalStyles'
import { Stack, Typography } from '@mui/material'
import AddNewImportExportButton from './AddNewimportExportButton'
import CustomerSearchBar from './CustomerSearchbar'
import AddCustomerButton from './AddCustomerButton'
import CustomerFilterStatus from './CustomerFilterStatus'
import CustomerTable from './CustomerTable'
import { updateCustomersCount } from 'Components/Assets/UIServices'


function Customers() {

  const [customers, setCustomers] = React.useState([]);
  const [counts, setCounts] = React.useState({});

  React.useEffect(() => {
    setCounts(updateCustomersCount());
  }, []);

  return (
    <>
    <ComponentHeader>
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
        <AddNewImportExportButton/>
      </Stack>
    </ComponentHeader>
    <ComponentBody>
      <Stack
      direction="row"
      justifyContent="space-between"
      >
        <CustomerSearchBar/>
        <AddCustomerButton/>
      </Stack>

      <CustomerFilterStatus  counts = {counts} setCustomers = {setCustomers}/>

      <CustomerTable customers = {customers}/>


    </ComponentBody>
    </>
  )
}

export default Customers