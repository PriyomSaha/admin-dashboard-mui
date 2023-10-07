import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/Assets/GlobalStyles";
import { MdClose } from "react-icons/md";
import { theme } from "Components/UI/themes";
import { useMediaQuery } from "@mui/material";
import GlobalCharges from "./GlobalCharges";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";

function AddCharges({ isModalOpen, setIsModalOpen }) {
  const [applicableOn, setApplicableOn] = useState("merchant");

  return (
    <>
      <Modal open={isModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
            <Typography variant="h6">Custom Charge</Typography>

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
            <Typography mb={1} fontWeight={600}>
              Charge Name
            </Typography>
            <TextField
              sx={{
                width: useMediaQuery(theme.breakpoints.down("md"))
                  ? "100%"
                  : "50%",
              }}
              label="Enter charge name*"
              variant="outlined"
              multiline
              size="small"
              maxRows={1}
            />

            <Typography mt={2} mb={1} fontWeight={600}>
              Charge Description
            </Typography>
            <TextField
              fullWidth
              label="Enter charge description*"
              variant="outlined"
              multiline
              rows={2}
              size="small"
            />

            <Typography variant="h6" mt={2} fontWeight={600}>
              Applicable On
            </Typography>
            <Typography>
              Select level at which the charges will be applied on
            </Typography>

            <FormControl mb={2}>
              <RadioGroup
                value={applicableOn}
                onChange={(e) => setApplicableOn(e.target.value)}
              >
                <FormControlLabel
                  value="merchant"
                  control={<Radio sx={{ alignSelf: "flex-start" }} />}
                  label={
                    <Typography>
                      <Typography fontWeight={700} mt={1}>
                        Merchant Level
                      </Typography>
                      Merchant level charges can be defined at individual
                      merchant level. Merchants can set rules for different
                      charges.
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="global"
                  control={<Radio sx={{ alignSelf: "flex-start" }} />}
                  label={
                    <Typography>
                      <Typography fontWeight={700} mt={1}>
                        Global Level
                      </Typography>
                      Global level charges are defined at tenant level and are
                      applicable on all listed merchants. Merchants have no
                      control on global charges.
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>

            {applicableOn === "global" ? <GlobalCharges /> : null}

            <SaveCancelButtons
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddCharges;
