import React, { forwardRef, useEffect, useState } from "react";
import { Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { CustomSwitch } from "Components/Assets/GlobalStyles";
import { sound } from "Components/Assets/ReusableComp/SoundNotification";

function OrderAccept({}, ref) {
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState("");
  const [placeHolder, setPlaceholder] = useState("");

  useEffect(() => {
    if (enabled) {
      setPlaceholder("We are accepting Orders !");
      setMessage("Accepting Orders.");
    } else {
      setMessage("Currently we are not accepting orders.");
      sound.play();
    }
  }, [enabled]);

  return (
    <>
      {/* Grid for Site Settings Section */}
      <Grid ref={ref} item xs={12} sm={6}>
        <Box mt={2}>
          {/* Section Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Accept Orders
          </Typography>
          {/* Section Description */}
          <Typography>
            Order Preferences: Enable or Disable Acceptance
          </Typography>
        </Box>
      </Grid>
      {/* Grid for the Site Settings Form */}
      <Grid
        container
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box width={"100%"}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" onClick={() => setEnabled(false)}>
              DISABLE
            </Typography>
            <CustomSwitch
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography variant="h6" onClick={() => setEnabled(true)}>
              <b>ENABLE</b>
            </Typography>
          </Stack>
          <Box width={"100%"} mt={1}>
            <Paper elevation={3}>
              <Box px={4} py={3}>
                <Typography sx={{ fontWeight: 500 }}>Custom Message</Typography>
                <TextField
                  fullWidth
                  label="Message"
                  placeholder={placeHolder}
                  variant="outlined"
                  size="small"
                  value={message} // Set value to state variable
                  onChange={(e) => setMessage(e.target.value)} // Update state on input change
                  sx={{ mt: 2 }}
                  disabled={!enabled}
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(OrderAccept);
