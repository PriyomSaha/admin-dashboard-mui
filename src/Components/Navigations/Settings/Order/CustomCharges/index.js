import React, { forwardRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Box, Button, Grid, Typography } from "@mui/material";
import { theme } from "Components/UI/themes";
import AddCharges from "./AddCharges";
import ChargesTable from "./ChargesTable";

function CustomCharges({}, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Grid for Site Settings Section */}
      <Grid ref={ref} item xs={12} sm={6}>
        <Box mt={2}>
          {/* Section Title */}
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Custom Charges
          </Typography>
          {/* Section Description */}
          <Typography>
            Additional Charges Added on Global or Merchant Level
          </Typography>
        </Box>
      </Grid>
      {/* Grid for the Site Settings Form */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained-dark"
            sx={{
              ":hover": {
                background: theme.palette.grey[800],
              },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Create&nbsp;
            <AiOutlinePlus />
          </Button>
        </Box>
      </Grid>
      <AddCharges isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Grid item xs={12}>
        <Box>
          <ChargesTable />
        </Box>
      </Grid>
    </>
  );
}

export default forwardRef(CustomCharges);
