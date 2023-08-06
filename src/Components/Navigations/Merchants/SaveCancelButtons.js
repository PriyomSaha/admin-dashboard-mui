import React from "react";
import { Box, Button } from "@mui/material";
import { theme } from "Components/UI/themes";
function SaveCancelButtons({ isModalOpen, setIsModalOpen }) {
  return (
    <>
      <hr />
      <Box pb={4}>
        <Button
          variant="contained"
          sx={{
            float: "right",
            position: "relative",
          }}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{
            float: "left",
            position: "relative",
            background: `${theme.palette.grey[600]}`,
            "&:hover": {
              background: `${theme.palette.grey[700]}`,
            },
          }}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Close
        </Button>
      </Box>
    </>
  );
}

export default SaveCancelButtons;
