import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { TfiLayoutWidthDefault } from "react-icons/tfi";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import Export from "Components/Assets/ReusableComp/Export";
import DateRangePicker from "Components/Assets/ReusableComp/DateRangePicker";
import { theme } from "Components/UI/themes";

const ExportModal = ({ isModalOpen, setIsModalOpen }) => {
  const headers = [
    { label: "First Name", key: "details.firstName" },
    { label: "Last Name", key: "details.lastName" },
    { label: "Job", key: "job" },
  ];

  const data = [
    { details: { firstName: "Ahmed", lastName: "Tomi" }, job: "manager" },
    { details: { firstName: "John", lastName: "Jones" }, job: "developer" },
  ];

  const [showList, setShowList] = useState(false);

  const handleToggleList = () => {
    setShowList(!showList);
  };
  return (
    <>
      <Modal open={isModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
            <Typography variant="h6">Export Report</Typography>
            <IconButton
              aria-label="close"
              onClick={() => setIsModalOpen(!isModalOpen)}
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
          <Box sx={FullScreenModalContent}>
            <Grid container alignItems={"center"}>
              <Grid item xs={12}>
                <FormLabel>Pick Date</FormLabel>
              </Grid>
              <Grid item xs={12} mt={1}>
                <DateRangePicker enableFutureDateSelection={false} />
              </Grid>
            </Grid>
            <Box>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel>Merchants</FormLabel>
                <RadioGroup row defaultValue="all">
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormLabel>Coulumns</FormLabel>
              <Grid container mt={0.5} spacing={1}>
                <Grid item>
                  <Button
                    sx={{ pl: 2, pt: 0, pb: 0 }}
                    size="small"
                    color="secondary"
                    variant="contained"
                    startIcon={
                      <IconButton edge="start">
                        <TfiLayoutWidthDefault color="black" />
                      </IconButton>
                    }
                  >
                    Default (20)
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={handleToggleList}
                    sx={{ width: "100px", pt: 0, pb: 0 }}
                    startIcon={
                      <IconButton edge="start">
                        {showList ? (
                          <IoEyeOff color="black" />
                        ) : (
                          <IoEye color="black" />
                        )}
                      </IconButton>
                    }
                  >
                    {showList ? "Hide" : "Show"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel>Select Format</FormLabel>
                <RadioGroup row defaultValue="csv">
                  <FormControlLabel
                    value="csv"
                    control={<Radio />}
                    label="CSV or Excel"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={4}>
              <Export
                data={data}
                headers={headers}
                fileName="CommissionReport"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ExportModal;
