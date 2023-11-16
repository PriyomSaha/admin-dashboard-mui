import React, { useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { MdClose } from "react-icons/md";
import {
  FullScreenModalContainer,
  FullScreenModalContent,
  FullScreenModalHeader,
} from "Components/UI/GlobalStyles";
import { theme } from "Components/UI/themes";
import { FaRegEdit } from "react-icons/fa";
import MerchantDetails from "./MerchantDetails";
import SaveCancelButtons from "Components/Assets/ReusableComp/SaveCancelButtons";
import CommissionConfiguration from "./CommissionConfiguration";
import SearchEngineOptimization from "./SearchEngineOptimization";

const AddEditMerchant = ({ merchantName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FaRegEdit
        onClick={() => setIsModalOpen(true)}
        style={{ fontSize: "25px", cursor: "pointer" }}
      />
      <Modal open={isModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
            <Typography variant="h6">Edit Merchant</Typography>

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
            <Box>
              <MerchantDetails />
            </Box>
            <Box>
              <CommissionConfiguration />
            </Box>
            <Box>
              <SearchEngineOptimization />
            </Box>
            <Box mt={4}>
              <SaveCancelButtons
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddEditMerchant;
