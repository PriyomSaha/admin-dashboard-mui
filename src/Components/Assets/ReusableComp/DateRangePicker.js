// Importing required components and libraries
import { Box, Button } from "@mui/material";
import React, { useState, forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { BsFillCalendarFill, BsFillCaretDownFill } from "react-icons/bs";
import useMediaQuery from "@mui/material/useMediaQuery";

// Defining the DateRangePicker component
function DateRangePicker() {
  // Importing the dayjs library
  const dayjs = require("dayjs");
  const date = new Date();

  // State variables to hold selected start and end dates
  const [startDate, setStartDate] = useState(
    // new Date(dayjs().subtract(1, "month"))
    new Date()
  );
  const [endDate, setEndDate] = useState(new Date());

  // Function to handle the change in date range
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Function to set predefined date range selections
  const setSelectionRange = (value) => {
    if (value === "prev-month") {
      // Set date range for the previous month
      setStartDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
      setEndDate(new Date(date.getFullYear(), date.getMonth(), 0));
    } else if (value === "curr-month") {
      // Set date range for the current month
      setStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
      setEndDate(new Date());
    } else if (value === "yesterday") {
      // Set date range for yesterday
      setStartDate(new Date(dayjs().subtract(1, "day")));
      setEndDate(new Date(dayjs().subtract(1, "day")));
    } else {
      // Set default date range (today)
      setStartDate(new Date());
      setEndDate(new Date());
    }
  };

  // Check if the screen size is small, load 2 months, otherwise 1 month
  const isSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.between(0, 685)
  );

  // Custom input component for the DatePicker
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      type="text"
      onClick={onClick}
      ref={ref}
      sx={{ color: `var(--header-nav-background)}` }}
    >
      <BsFillCalendarFill /> &nbsp;&nbsp;
      {value}&nbsp;&nbsp; <BsFillCaretDownFill />
    </Button>
  ));

  // Calendar container component for DatePicker
  const Container = ({ className, children }) => {
    return (
      <Box className="calender-container">
        <CalendarContainer className={className}>
          <Box sx={{ position: "relative" }}>{children}</Box>
        </CalendarContainer>
        <Box sx={{ position: "relative" }}>
          <Button
            sx={{ color: "white" }}
            onClick={() => setSelectionRange("today")}
          >
            Today
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={() => setSelectionRange("yesterday")}
          >
            Yesterday
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={() => setSelectionRange("curr-month")}
          >
            This month
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={() => setSelectionRange("prev-month")}
          >
            Last Month
          </Button>
        </Box>
      </Box>
    );
  };

  // Render the DateRangePicker component
  return (
    <div>
      <DatePicker
        monthsShown={isSmallScreen ? 1 : 2}
        customInput={<CustomInput />}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        maxDate={new Date()}
        calendarContainer={Container}
        shouldCloseOnSelect={true}
        disabledKeyboardNavigation
        onCalendarClose={() => {
          if (endDate === null) setEndDate(startDate);
          console.log("Call filtered data from API");
        }}
      />
    </div>
  );
}

// Export the DateRangePicker component
export default DateRangePicker;
