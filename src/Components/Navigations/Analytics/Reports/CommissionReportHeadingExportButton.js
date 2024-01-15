import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Export from "Components/Assets/ReusableComp/Export";
import { theme } from "Components/UI/themes";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import ExportModal from "./ExportModal";

function CommissionReportHeadingExportButton() {
  const matches = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box sx={{ mt: 3 }}>
      <Stack
        direction={matches ? "column" : "row"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Typography variant={"h5"} fontWeight={700}>
          Commission Reports
        </Typography>
        <Button variant="contained-dark" onClick={() => setIsModalOpen(true)}>
          Export
        </Button>
        <ExportModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Stack>
    </Box>
  );
}

export default CommissionReportHeadingExportButton;
