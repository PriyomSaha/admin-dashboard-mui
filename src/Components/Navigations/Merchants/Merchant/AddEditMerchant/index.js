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
import { useMerchantStore } from "Components/Assets/StateManagement";

const AddEditMerchant = () => {
  // Access state and functions from the merchant store using custom hooks
  const isMerchantModalOpen = useMerchantStore(
    (state) => state.isMerchantModalOpen
  );
  const setIsMerchantModalOpen = useMerchantStore(
    (state) => state.setIsMerchantModalOpen
  );
  const merchantType = useMerchantStore((state) => state.merchantType);

  return (
    <>
      <Modal open={isMerchantModalOpen} sx={FullScreenModalContainer}>
        <Box>
          <Box sx={FullScreenModalHeader}>
            <Typography variant="h6">{merchantType} Merchant</Typography>

            <IconButton
              aria-label="close"
              onClick={() => setIsMerchantModalOpen()}
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
                isModalOpen={isMerchantModalOpen}
                setIsModalOpen={setIsMerchantModalOpen}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddEditMerchant;
