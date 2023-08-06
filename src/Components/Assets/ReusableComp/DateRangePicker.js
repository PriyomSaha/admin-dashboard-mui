import { Box, Button } from "@mui/material";
import React, { useState, forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { BsFillCalendarFill, BsFillCaretDownFill } from "react-icons/bs";
import useMediaQuery from "@mui/material/useMediaQuery";
function DateRangePicker() {
  const dayjs = require("dayjs");
  const date = new Date();

  const [startDate, setStartDate] = useState(
    new Date(dayjs().subtract(1, "month"))
  );
  const [endDate, setEndDate] = useState(new Date());

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const setSelectionRange = (value) => {
    if (value === "prev-month") {
      setStartDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
      setEndDate(new Date(date.getFullYear(), date.getMonth(), 0));
    } else if (value === "curr-month") {
      setStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
      setEndDate(new Date());
    } else if (value === "yesterday") {
      setStartDate(new Date(dayjs().subtract(1, "day")));
      setEndDate(new Date(dayjs().subtract(1, "day")));
    } else {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  };
  // check if small screen load 2 months else 1 month
  const isSmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.between(0, 685)
  );

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
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
  return (
    <div>
      <DatePicker
        monthsShown={isSmallScreen ? 1 : 2}
        customInput={<ExampleCustomInput />}
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

export default DateRangePicker;
