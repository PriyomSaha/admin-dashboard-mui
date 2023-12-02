import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import DateRangePicker from "Components/Assets/ReusableComp/DateRangePicker";

export default function AddEditCoupon() {
  const [value, setValue] = React.useState(null);

  return <DateRangePicker enableFutureDateSelection={true} />;
}
