// Importing necessary React components and libraries
import * as React from "react";
import {
  // Importing MUI (Material-UI) components and styles
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// Importing additional components and styles
import DateRangePicker from "Components/Assets/ReusableComp/DateRangePicker";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import { MdClose } from "react-icons/md";

// Importing custom hook for state management
import { useCouponStore } from "Components/Assets/StateManagement";
import CompactChipInputSelect from "Components/Assets/ReusableComp/CompactChipInputSelect";
import { theme } from "Components/UI/themes";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";

// Main function component for adding or editing a coupon
export default function AddEditCoupon() {
  // Accessing state and functions from the coupon store using custom hooks
  const isCouponModalOpen = useCouponStore((state) => state.isCouponModalOpen);
  const setIsCouponModalOpen = useCouponStore(
    (state) => state.setIsCouponModalOpen
  );
  const couponType = useCouponStore((state) => state.couponType);

  // State for managing selected merchants and discount type
  const [selectedMerchantsList, setSelectedMerchantsList] = React.useState([]);
  const [discountType, setDiscountType] = React.useState("percentage");
  const [usageLimit, setUsageLimit] = React.useState({
    usageCount: false,
    sigleUsagePerCustomer: false,
  });
  const [couponCode, setCouponCode] = React.useState("");
  const [status, setStatus] = React.useState("active");

  // Handle usageLimit checkbox state changes
  const handleCheckboxChange = (checkboxName) => {
    setUsageLimit((prevCheckedItems) => ({
      ...prevCheckedItems,
      [checkboxName]: !prevCheckedItems[checkboxName],
    }));
  };

  // List of all available merchants
  const allMerchantsList = [
    "merchant1",
    "merchant2",
    "merch3",
    "merch4",
    "merch5",
  ];

  return (
    <>
      {console.log(usageLimit)}
      {/* The modal dialog for adding or editing a coupon */}
      <Modal open={isCouponModalOpen} sx={FullScreenModalContainer}>
        <Box>
          {/* Modal header containing the title and close button */}
          <Box sx={FullScreenModalHeader}>
            {/* Title of the modal based on the coupon type */}
            <Typography variant="h6">{couponType} Coupon</Typography>

            {/* Close button for the modal */}
            <IconButton
              aria-label="close"
              onClick={() => setIsCouponModalOpen()}
              sx={{
                position: "absolute",
                right: 10,
                top: 5,
                color: (theme) => theme.palette.grey[500],
                display: "flex",
                alignSelf: "center",
              }}
            >
              <MdClose />
            </IconButton>
          </Box>

          {/* Modal content for the coupon form */}
          <Box sx={FullScreenModalContent}>
            <Box>
              {/* Grid layout for arranging form elements in two columns */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* Text field for entering coupon code */}
                  <TextField
                    fullWidth
                    label="Coupon Code*"
                    variant="outlined"
                    size="small"
                    placeholder="Upper case only"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                  />

                  <Box mt={1} width={"100%"}>
                    {/* Date range picker for selecting start and end dates */}
                    <Typography color={theme.palette.grey[600]}>
                      Select Start & End date
                    </Typography>
                    <Box mt={1}>
                      <DateRangePicker enableFutureDateSelection={true} />
                    </Box>
                  </Box>

                  {/* Dropdown for selecting coupon status (active/inactive) */}
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>

                  <Box mt={1}>
                    {/* Radio buttons for selecting coupon type */}
                    <Typography color={theme.palette.grey[600]}>
                      Coupon Type
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        value={discountType}
                        onChange={(event) => {
                          setDiscountType(event.target.value);
                        }}
                      >
                        {/* Flat Amount */}
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12}>
                            <FormControlLabel
                              value="flat amount"
                              control={<Radio />}
                              label="Flat Amount"
                            />
                          </Grid>

                          {/* Input field for entering flat amount */}
                          {discountType === "flat amount" ? (
                            <>
                              <Grid item xs={6}>
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  type="number"
                                  label="Amount"
                                  InputProps={{
                                    min: "1",
                                    max: "100",
                                    step: 1, // The increment/decrement step for the input value
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        ₹
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                            </>
                          ) : null}
                        </Grid>

                        {/* Percentage */}
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12}>
                            <FormControlLabel
                              value="percentage"
                              control={<Radio />}
                              label="Percentage"
                            />
                          </Grid>

                          {/* Input fields for entering percentage and max amount */}
                          {discountType === "percentage" ? (
                            <>
                              <Grid item xs={6}>
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  type="number"
                                  label="Percentage"
                                  InputProps={{
                                    min: "1",
                                    max: "100",
                                    step: 1, // The increment/decrement step for the input value
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  variant="outlined"
                                  label="Max Amount"
                                  size="small"
                                  type="number"
                                  InputProps={{
                                    min: "1",
                                    max: "100",
                                    step: 1, // The increment/decrement step for the input value
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        ₹
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                            </>
                          ) : null}
                        </Grid>

                        {/* Free delivery */}
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={12}>
                            <FormControlLabel
                              value="free delivery"
                              control={<Radio />}
                              label="Free delivery"
                            />
                          </Grid>
                          {/* Input field for entering max distance for free delivery */}
                          {discountType === "free delivery" ? (
                            <>
                              <Grid item xs={6}>
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  type="number"
                                  label="Max Distance"
                                  InputProps={{
                                    min: "1",
                                    max: "100",
                                    step: 1, // The increment/decrement step for the input value
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        KM
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                            </>
                          ) : null}
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>

                {/* Second column of the grid */}
                <Grid item xs={12} sm={6}>
                  {/* Component for selecting merchants using chip input */}
                  <CompactChipInputSelect
                    totalList={allMerchantsList}
                    selectedItems={selectedMerchantsList}
                    setSelectedItems={setSelectedMerchantsList}
                    inputLabelText="Applicable on merchants*"
                  />

                  {/* Grid for specifying minimum purchase requirement */}
                  <Grid
                    container
                    width={"100%"}
                    spacing={1}
                    display={"flex"}
                    alignItems="center"
                  >
                    <Grid item xs={12} mt={1}>
                      {/* Label for minimum purchase requirement */}
                      <Typography color={theme.palette.grey[600]}>
                        Minimum Requirement
                      </Typography>
                    </Grid>
                    {/* Input field for entering minimum purchase amount */}
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Minimum"
                        size="small"
                        type="number"
                        InputProps={{
                          shrink: true,
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {/* Additional information about minimum purchase amount */}
                    <Grid item xs={7}>
                      <Typography fontWeight="300" fontSize={10}>
                        Enter minimum purchase amount for the coupon to work
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Dropdown for selecting payment modes */}
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    <InputLabel>Payment Modes</InputLabel>
                    <Select label="Payment Modes">
                      <MenuItem value="COD">COD</MenuItem>
                      <MenuItem value="UPI">UPI</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                      <MenuItem value="Net Banking">Net Banking</MenuItem>
                    </Select>
                  </FormControl>
                  <Box mt={1}>
                    <Typography color={theme.palette.grey[600]}>
                      Usage Limit
                    </Typography>
                    <Typography fontWeight="300" fontSize={10}>
                      Select Coupon usage limit.
                    </Typography>

                    <FormGroup sx={{ mt: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={usageLimit.usageCount}
                            onChange={() => handleCheckboxChange("usageCount")}
                          />
                        }
                        label="Limit number of times this can be used in total"
                      />
                      {usageLimit.usageCount ? (
                        <TextField
                          label="Count"
                          size="small"
                          type="number"
                          sx={{ mt: 1, width: "50%" }}
                        />
                      ) : null}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={usageLimit.sigleUsagePerCustomer}
                            onChange={() =>
                              handleCheckboxChange("sigleUsagePerCustomer")
                            }
                          />
                        }
                        label="Limit to one use per customer"
                      />
                    </FormGroup>
                  </Box>
                </Grid>
              </Grid>
              {/* Save and cancel buttons */}
              <Box mt={4}>
                <SaveCancelButtons
                  isModalOpen={setIsCouponModalOpen}
                  setIsModalOpen={isCouponModalOpen}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
