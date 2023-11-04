import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/Assets/GlobalStyles";
import CompactChipInputTextField from "Components/Assets/ReusableComp/CompactChipInputTextField";
import Countries from "Components/Assets/ReusableComp/Countries";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import PhoneInput from "react-phone-input-2";

function EventSettings({
  eventName,
  eventDescription,
  setEventDescription,
  isModalOpen,
  setIsModalOpen,
}) {
  const [selected, setSelected] = useState("SMS");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [tags, setTags] = useState([]);

  const tagStyle = {
    backgroundColor: theme.palette.grey[300],
    borderRadius: "5px",
    padding: theme.spacing(1),
    minHeight: "200px",
    width: FullScreenModalContent.maxWidth / 2,
  };
  return (
    <Modal open={isModalOpen} sx={FullScreenModalContainer}>
      <Box>
        <Box sx={FullScreenModalHeader}>
          <Typography variant="h6">{eventName}</Typography>

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
          <Box mb={2}>
            <Button
              onClick={() => setSelected("SMS")}
              variant={selected === "SMS" ? "contained-dark" : "outlined-dark"}
            >
              SMS
            </Button>
            <Button
              onClick={() => setSelected("EMAIL")}
              variant={
                selected === "EMAIL" ? "contained-dark" : "outlined-dark"
              }
            >
              EMAIL
            </Button>
          </Box>

          <Box mb={2}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6" color={theme.palette.grey[800]}>
                  Enter recipients
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.grey[600]}
                  mb={3}
                >
                  Input Mobile Numbers
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <Countries country={country} setCountry={setCountry} />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <PhoneInput
                      country={country.toLowerCase()}
                      enableSearch={true}
                      countryCodeEditable={false}
                      value={phoneNumber}
                      onChange={(phone) => setPhoneNumber(phone)}
                      placeHolder="Enter the phone number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button variant="contained">Add</Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>

          <Paper>
            <Box p={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Box sx={tagStyle}>
                    <Typography>Add Tag</Typography>
                    <CompactChipInputTextField
                      label="Tags"
                      chips={tags}
                      setChips={setTags}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={tagStyle}>n skjfsnken</Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Box mt={4}>
            <SaveCancelButtons
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default EventSettings;
