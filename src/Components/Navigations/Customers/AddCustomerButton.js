import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { theme } from "Components/UI/themes";
import { MdClose } from "react-icons/md";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
//import FirstLastNames from "Components/Assets/ReusableComp/FirstLastNames";
import PhoneInput from "react-phone-input-2";
import EmailInput from "Components/Assets/ReusableComp/EmailInput";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import Countries from "Components/Assets/ReusableComp/Countries";

function AddCustomerButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("IN");
  const [email, setEmail] = useState("");

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="contained-dark"
        sx={{
          ":hover": {
            background: theme.palette.grey[800],
          },
        }}
      >
        <AiOutlinePlus />
        AddCustomer
      </Button>
      <Modal open={isModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
            <Typography variant="h6"> Add Customer</Typography>

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
            <Typography fontSize="1.1rem">
              First name
              <Grid container item xs={12} style={{ marginTop: "5px" }}>
                <TextField
                  fullWidth
                  required
                  label="Enter first name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Typography>

            <Typography sx={{ mt: 2 }} fontSize="1.1rem">
              Last name
              <Grid container item xs={12} style={{ marginTop: "5px" }}>
                <TextField
                  fullWidth
                  label="Enter last name"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Typography>

            <Typography sx={{ mt: 2 }} fontSize="1.1rem">
              Email Address
              <Grid item xs={12} sm={6} style={{ marginTop: "5px" }}>
                <EmailInput email={email} setEmail={setEmail} />
              </Grid>
            </Typography>
            <Typography sx={{ mt: 1 }} fontSize="1.1rem">
              Mobile Number*
              <Grid container style={{ marginTop: "5px" }} spacing={1}>
                <Grid item xs={12} sm={4}>
                  <Countries country={country} setCountry={setCountry} />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <PhoneInput
                    country={country.toLowerCase()}
                    enableSearch={true}
                    countryCodeEditable={false}
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    placeHolder="Enter the phone number"
                  />
                </Grid>
              </Grid>
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <SaveCancelButtons
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                runOnSave={setIsModalOpen}
              />
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddCustomerButton;
